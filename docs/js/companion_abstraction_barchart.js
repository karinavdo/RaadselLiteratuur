class Barchart{

  constructor( data, elem_id, options ){
    this.data = data;
    this.elem_id = elem_id;
    this.options = options;

    // Create a copy of the defaults.
    this.settings = Object.assign( {}, COMPANION.HISTOGRAM.DEFAULTS );
    this.settings = Object.assign( this.settings, this.options );

    this.settings.plot_width = this.settings.figure_width - this.settings.plot_margin.left - this.settings.plot_margin.right;
    this.settings.plot_height = this.settings.figure_height - this.settings.plot_margin.top - this.settings.plot_margin.bottom;

    // Create series and sub series. Likely candidates for extraction/abstraction.
    // List of groups, in this case the scores in the score column in the data.
    this.groups = d3.map( this.data, function( d ){ return( d.score ) } );
    // List of subgroups, i.e. the headers of the columns
    // "quality" and "literariness" in the csv data.
    this.subgroups = this.data.columns.slice(2);
    this.subgroups.reverse();
    this.keys = [ 'literariness', 'quality' ];
    this.keys_nl = { 'quality': 'Algemene kwaliteit',
                    'literariness': 'Literaire kwaliteit' }

    this.color = d3.scaleOrdinal().range( bar_colors )

    this.data_point_labeler = new DataPointLabeler( this );

    this.render_barchart();
    this.render_legend();
  }


  // Function that actually draws the barchart.
  render_barchart(){

    this.svg = d3.select( 'div#' + this.elem_id + ' .plot' );

    // Append the svg object to the appropriate div.
    this.svg = d3.select( 'div#' + this.elem_id + ' .plot' )
      .append( 'svg' )
        .attr( 'width', this.settings.plot_width + this.settings.plot_margin.left + this.settings.plot_margin.right )
        .attr( 'height', this.settings.plot_height + this.settings.plot_margin.top + this.settings.plot_margin.bottom )
        .append( 'g' )
          .attr( 'transform', 'translate( ' + this.settings.plot_margin.left + ', ' + this.settings.plot_margin.top + ' )' );

    // Add X axis.
    this.x_scale = d3.scaleBand()
      .domain( this.groups )
      .range( [0, this.settings.plot_width] )
      .padding( [0.2] )
    this.svg.append( "g" )
      .attr( 'transform', 'translate(0,' + this.settings.plot_height + ')' )
      .call( d3.axisBottom( this.x_scale ).tickSize(5) )
      .attr( 'style', this.settings.scale_style );

    // Another scale for subgroup positioning.
    this.x_subgroup = d3.scaleBand()
      .domain( this.subgroups )
      .range( [0, this.x_scale.bandwidth() ] )
      .padding( [0.09] )

    // Add Y axis
    this.y_scale = d3.scaleLinear()
      .domain( [0, 400] )
      .range( [this.settings.plot_height, 0]);
    this.svg.append( 'g' )
      .call( d3.axisLeft( this.y_scale ) )
      .attr( 'id', 'yaxis' )
      .attr( 'style', this.settings.scale_style );

    // Show the bars
    var _this = this;
    this.svg.append( 'g' )
      .selectAll( 'g' )
      // Enter in data = loop group per group
      .data( this.data )
      .enter()
      .append( 'g' )
        .attr( 'transform', function(d) { return 'translate(' + _this.x_scale( d.score ) + ',0)'; } )
      .selectAll( 'rect' )
      .data( function( d ){ return _this.subgroups.map( function( key ) { return { score: d.score, key: key, value: d[key] } } ) } )
      .enter().append( 'rect' )
        .attr( 'x', function( d ){ return _this.x_subgroup( d.key ) } )
        .attr( 'y', function( d ){ return _this.y_scale( d.value ) } )
        .attr( 'width', this.x_subgroup.bandwidth() )
        .attr( 'height', function( d ){ return _this.settings.plot_height - _this.y_scale( d.value ) } )
        .attr( 'fill', function( d ){ return _this.color( d.key ) } )
        .on( 'click', function( evt, d ){ _this.data_point_labeler.toggle_data_point_label( d, this ) } );

    // Render x axis label.
    // TODO:
    // const gutter_height = plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
    this.gutter_height = 30;
    this.x_axis_label_y = this.settings.figure_height - ( this.settings.plot_margin.bottom / 2 );
    this.x_axis_label_x = this.settings.plot_width / 2;
    this.svg.append( 'g' )
      .attr( 'transform', 'translate(' + this.x_axis_label_x + ', ' + this.x_axis_label_y + ')' )
      .append( 'text' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'style', this.settings.axis_style ) // Was font-size: 80% which is smaller but looks way smarter!
        .text( this.settings.x_axis_title_nl );

    // Render y axis label.
    // Compute the space left between axis ticks and edge of figure.
    this.gutter_width = this.settings.plot_margin.left - d3.select( '#yaxis' ).node().getBBox().width
    // Calculate center of gutter.
    this.yAxisLabelX = -this.settings.plot_margin.left + ( this.gutter_width / 2 )
    // Calculate center of y axis.
    this.yAxisLabelY = this.settings.plot_margin.top + this.settings.plot_height / 2;
    // Put y axis label center on calculated spot.
    this.svg.append( 'g' )
      .attr( 'transform', 'translate(' + this.yAxisLabelX + ', ' + this.yAxisLabelY + ')' )
      .append( 'text' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'transform', 'rotate(-90)' )
        .attr( 'style', this.settings.axis_style )
        .text( this.settings.y_axis_title_nl );

  } // End function render_barchart


  render_legend(){
    var _this = this;
    this.key_size = 17;
    this.svg.selectAll( 'legend_key' )
      .data( this.keys )
      .enter()
      .append( 'rect' )
        .attr( 'x', 430 )
        // 100 is where the first dot appears. 25 is the distance between dots
        .attr( 'y', function(d,i){ return 100 + i*( _this.key_size+10 ) } )
        .attr( 'width', this.key_size )
        .attr( 'height', this.key_size )
        .style( 'fill', function(d){ return _this.color( d ) } )
    this.svg.selectAll( 'legend_key_labels' )
      .data( this.keys )
      .enter()
      .append( 'text' )
        .attr( 'x', 435 + this.key_size*1.2 )
        // 100 is where the first dot appears. 25 is the distance between dots
        .attr( 'y', function(d,i){ return 105 + i*( _this.key_size+10 ) + ( _this.key_size/2 ) } )
        .attr( 'style', this.settings.axis_style )
        .text( function(d){ return _this.keys_nl[ d ] } )
        .attr( 'text-anchor', 'left' )
        .style( 'alignment-baseline', 'middle' )
  }


} // End of class Barchart.
