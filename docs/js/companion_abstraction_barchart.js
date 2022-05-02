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
    var group_column = this.settings.group_column;
    this.groups = d3.map( this.data, function( d ){ return( d[ group_column ] ) } );

    // List of subgroups, i.e. the headers of the columns
    // "quality" and "literariness" in the csv data.
    this.subgroups = this.data.columns.slice(2);

    this.color = d3.scaleOrdinal().range( bar_colors )

    this.data_point_labeler = new DataPointLabeler( this );

    this.render_barchart();

    if( typeof this.options.legend_x_adjust == 'undefined' ){
      this.options.legend_x_adjust = -50
    }

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
    var group_labels = this.groups;
    if( typeof eval( 'this.settings.group_labels_' + LANG ) != 'undefined' ){
      group_labels = group_labels.map( group => eval( 'this.settings.group_labels_' + LANG )[ group ] );
    }
    this.x_scale = d3.scaleBand()
      .domain( group_labels )
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
      .padding( [0.09] );

    if( typeof this.settings.y_max == 'undefined' ){
      this.settings.y_max = 1.2 * d3.max( d3.merge( this.data.map( function(d){
        return Object.values(d).slice(2);
      } ) ).map( function(d){ return parseInt(d) } ) )
    }

    // Add Y axis
    this.y_scale = d3.scaleLinear()
      .domain( [0, this.settings.y_max ] ).nice()
      .range( [this.settings.plot_height, 0]);
    this.svg.append( 'g' )
      .call( d3.axisLeft( this.y_scale )
        .ticks( this.settings.num_y_ticks ) )
      .attr( 'id', 'yaxis' )
      .attr( 'style', this.settings.scale_style );

    // This helper funciton translate group names in the raw
    // data to group labels if such translations are set
    // in the settings.
    function data_group_name_to_group_label( data_group_name, group_labels ){
      var group_label = data_group_name;
      if( typeof group_labels != 'undefined' ){
        group_label = group_labels[ data_group_name ]
      }
      return group_label
    }

    // Show the bars
    var _this = this;
    var group_label =
    this.svg.append( 'g' )
      .selectAll( 'g' )
      // Enter in data = loop group per group
      .data( this.data )
      .enter()
      .append( 'g' )
        .attr( 'transform', function(d) { return 'translate(' + _this.x_scale( data_group_name_to_group_label( d[_this.settings.group_column], eval( '_this.settings.group_labels_' + LANG  ) ) ) + ',0)'; } )
      .selectAll( 'rect' )
      .data( function( d ){ return _this.subgroups.map( function( key ) { return { score: data_group_name_to_group_label( d[_this.settings.group_column], eval( '_this.settings.group_labels_' + LANG ) ), key: key, value: d[key] } } ) } )
      .enter().append( 'rect' )
        .attr( 'x', function( d ){ return _this.x_subgroup( d.key ) } )
        .attr( 'y', function( d ){ return _this.y_scale( d.value ) } )
        .attr( 'width', this.x_subgroup.bandwidth() )
        .attr( 'height', function( d ){ return _this.settings.plot_height - _this.y_scale( d.value ) } )
        .attr( 'fill', function( d ){ return _this.color( d.key ) } )
        .on( 'click', function( evt, d ){ console.log( d), _this.data_point_labeler.toggle_data_point_label( d, this ) } );

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
        .text( eval( 'this.settings.x_axis_title_' + LANG ) );

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
        .text( eval( 'this.settings.y_axis_title_' + LANG ) );

  } // End function render_barchart


  render_legend(){
    var keys = this.data.columns.slice(2);
    if( typeof eval( 'this.settings.series_labels' + LANG ) != 'undefined' ){
      keys = Object.keys( eval( 'this.settings.series_labels' + LANG ) );
    }
    var _this = this;
    this.key_size = 17;
    this.legend_left = this.settings.figure_width - this.settings.plot_margin.right + this.options.legend_x_adjust;
    this.svg.selectAll( 'legend_key' )
      .data( keys )
      .enter()
      .append( 'rect' )
        // .attr( 'x', 430 ) //680
        .attr( 'x', this.legend_left )
        // 100 is where the first dot appears. 25 is the distance between dots
        .attr( 'y', function(d,i){ return 100 + i*( _this.key_size+10 ) } )
        .attr( 'width', this.key_size )
        .attr( 'height', this.key_size )
        .style( 'fill', function(d){ return _this.color( d ) } )
    this.svg.selectAll( 'legend_key_labels' )
      .data( keys )
      .enter()
      .append( 'text' )
        .attr( 'x', this.legend_left + this.key_size*1.5 )
        // 100 is where the first dot appears. 25 is the distance between dots
        .attr( 'y', function(d,i){ return 105 + i*( _this.key_size+10 ) + ( _this.key_size/2 ) } )
        .attr( 'style', this.settings.axis_style )
        .text( function(d){
          if( typeof eval( '_this.settings.series_labels_' + LANG ) != 'undefined'){
            return eval( '_this.settings.series_labels_' + LANG )[ d ]
          } else {
            return d;
          }
        } )
        .attr( 'text-anchor', 'left' )
        .style( 'alignment-baseline', 'middle' )
  }


} // End of class Barchart.
