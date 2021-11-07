class Histogram{

  constructor( data, elem_id, options ){
    this.data = data;
    this.elem_id = elem_id;
    this.options = options;

    // Create a copy of the defaults.
    this.settings = Object.assign( {}, COMPANION.HISTOGRAM.DEFAULTS );
    this.settings = Object.assign( this.settings, this.options );

    this.render_histogram();
    this.render_slider();
  }


  // Function that actually draws the histogram.
  render_histogram(){

    this.svg = d3.select( 'div#' + this.elem_id + ' .plot' );

    // Remove a possible already rendered svg.
    if( !this.svg.select( 'svg' ).empty() ){
      console.log( 'empty' );
      this.svg.select( 'svg' ).remove();
    };

    // Append the svg object to the appropriate div.
    this.svg = d3.select( 'div#' + this.elem_id + ' .plot' )
      .append( 'svg' )
        .attr( 'width', this.settings.plot_width + this.settings.plot_margin.left + this.settings.plot_margin.right )
        .attr( 'height', this.settings.plot_height + this.settings.plot_margin.top + this.settings.plot_margin.bottom )
        .append( 'g' )
          .attr( 'transform', 'translate( ' + this.settings.plot_margin.left + ', ' + this.settings.plot_margin.top + ' )' );

    // X axis: scale and draw.
    // Determines axis settings.
    if( typeof this.settings.x_min=='undefined' ){
      this.settings.x_min = 0
    };
    if( typeof this.settings.x_max=='undefined' ){
      this.settings.x_max = d3.max( this.data, function( d ){ return d.X } );
    };

    // Create X scale.
    this.xScale = d3.scaleLinear()
      .domain( [ this.settings.x_min, this.settings.x_max ] )
      .range( [0, this.settings.plot_width] );
    this.svg.append( 'g' )
      .attr( 'transform', 'translate( 0, ' + this.settings.plot_height + ' )' )
      .call( d3.axisBottom( this.xScale )
        .ticks( 5 ) )  // Limit ticks so they do not crowd the x axis
      .attr( 'style', this.settings.scale_style );

    // Set the parameters for the histogram function.
    this.thresholds = d3.map( this.xScale.ticks( this.settings.bins_hint ), function( d ){ return d+1 } );
    this.histogram = d3.histogram()
      .value( function( d ){ return d.X; } )   // Inject values.
      .domain( this.xScale.domain() )  // Then the domain of the graphic.
      .thresholds( this.thresholds ); // Then the cut points of the bins.

    this.bins = this.histogram( this.data );

    // Y axis: scale and draw.
    // Determines axis settings.
    if( typeof this.settings.y_min=='undefined' ){
      this.settings.y_min = 0
    };
    if( typeof this.settings.y_max=='undefined' ){
      this.settings.y_max = d3.max( this.bins, function( d ){ return d.length } );
    };

    // Create Y scale.
    this.yScale = d3.scaleLinear()
      .range( [this.settings.plot_height, 0] );
    // d3.hist has to be called before the Y axis obviously.
    // The 1.1 factor just adds a little 'breathing space'
    // between the maximum and the top of the chart.
    this.yScale.domain( [ this.settings.y_min, ( 1.1 * this.settings.y_max ) ] );
    this.svg.append( 'g' )
      .call( d3.axisLeft( this.yScale )
        .ticks( this.y_ticks() )
        .tickFormat( x =>  numformat( x ) ) )
      .attr( 'id', 'yaxis' )
      .attr( 'style', this.settings.scale_style );

    // Draw bars
    var _this = this;
    this.svg.selectAll( 'rect' )
      .data ( this.bins )
      .enter()
      .append( 'rect' )
        .attr( 'transform', function( d ){ return 'translate( ' + _this.xScale( d.x0 ) + ', ' + _this.yScale( d.length ) + ' )'; })
        .attr( 'width', function( d ){ return _this.xScale( d.x1 ) - _this.xScale( d.x0 ) -1 ; })
        .attr( 'height', function( d ){ return _this.settings.plot_height - _this.yScale( d.length ); })
        .style( 'fill', bar_colors[2] )
        .on( 'click', function( evt, d ){ _this.toggle_data_point_label( d, this ) } );

    // Render x axis label.
    // TODO:
    // const gutter_height = settings.plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
    this.gutter_height = 30;
    this.xAxisLabelY = this.settings.figure_height - ( this.settings.plot_margin.bottom / 2 );
    this.xAxisLabelX = this.settings.plot_width / 2;
    this.svg.append( 'g' )
      .attr( 'transform', 'translate(' + this.xAxisLabelX + ', ' + this.xAxisLabelY + ')' )
      .append( 'text' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'style', this.settings.axis_style )
        .text( this.settings.x_axis_title_nl );

    // Render y axis label.
    // Compute the space left between axis ticks and edge of figure.
    this.gutter_width = this.settings.plot_margin.left - d3.select('#yaxis').node().getBBox().width
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

  } // End function render


  // Helper function to detemine num of y ticks
  y_ticks(){
    var n = 7;
    var max_Y = d3.max( this.bins, function( d ){ return d.length; } );
    if( max_Y < 5 ){
      n = max_Y
    }
    return n
  }

  toggle_data_point_label( d, rect ){
    var bar = d3.select( rect );
    var svg = this.svg;
    // We remove anything to do with highlighting and labeling.
    // Essentially this is 'toggle off'.
    svg.selectAll( 'rect' ).style( 'fill', bar_colors[2] );
    var chart_bar_datum_label = svg.select( '.chart_bar_datum_label' )
    if( chart_bar_datum_label ){
      chart_bar_datum_label.remove();
    };
    // We only then toggle the highlight on if a non highlighted bar
    // is clicked.
    if( bar.classed( 'highlighted' ) ){
      bar.classed( 'highlighted', false );
    } else {
      // Remember to put all bars in a non highlighted state.
      svg.selectAll( 'rect' ).classed( 'highlighted', false );
      svg.append( 'g' )
        // Create an id for text so we can select it later for removing
        // on mouseout.
        .classed( 'chart_bar_datum_label', true )
        .append( 'text' )
          .attr( 'x', this.xScale( d.x0 ) )
          .attr( 'y', this.yScale( d.length ) )
          .attr( 'style', this.settings.scale_style )
          .text( d.length );
      // Now we need some calculations to determine location
      // of label and the connector to the data point.
      var label_g = svg.select( '.chart_bar_datum_label' )
      var bbox = label_g.node().getBBox();
      // Project left x position of label box on the width
      // of the plot minus the label box width.
      // This guarantees that the label box always falls within the div
      // of the chart horizontally, and thus will be visible.
      var label_box_width = bbox.width + 2*this.settings.label_x_padding;
      var label_box_height = bbox.height + 2*this.settings.label_y_padding;
      var label_box_x = bbox.x * ( ( this.settings.plot_width - label_box_width ) / this.settings.plot_width ) - 8;
      // For y positioning we need something too.
      var label_box_y = bbox.y - this.settings.label_y_padding + this.settings.label_y_distance;
      if( this.yScale( d.length ) > 0.5*this.settings.plot_height ){
        label_box_y = bbox.y - this.settings.label_y_padding - this.settings.label_y_distance;
      }
      var connector_y_start = label_box_y + 0.5*label_box_height;
      var connector_x_start = label_box_x + label_box_width;
      var connector_x_end = this.xScale( d.x0 ) + ( ( this.xScale( d.x1 ) - this.xScale( d.x0 ) + 1 ) / 2 );
      var connector_y_end = this.yScale( d.length );

      //Now we draw label and connector.
      var label_text = svg.select( '.chart_bar_datum_label text' );
      label_text.attr( 'x', label_box_x + this.settings.label_x_padding );
      label_text.attr( 'y', label_box_y + label_box_height - 2*this.settings.label_y_padding );
      label_g.insert( 'rect', ':first-child' )
        .attr( 'x', label_box_x )
        .attr( 'y', label_box_y )
        .attr( 'width', label_box_width )
        .attr( 'height', label_box_height )
        .attr( 'fill', this.settings.label_fill )
        .attr( 'stroke', this.settings.label_stroke )
        .attr( 'stroke-width', this.settings.label_stroke_width );
      var connector_path = d3.path();
      connector_path.moveTo( connector_x_start, connector_y_start );
      var control_y = connector_y_start - ( ( connector_y_start - connector_y_end ) / 2 );
      var control_x = connector_x_start + 50;
      if( control_x > this.settings.plot_width ) { control_x = this.settings.plot_width }
      connector_path.quadraticCurveTo( control_x, control_y, connector_x_end, connector_y_end );
      label_g.append( 'path' )
        .attr( 'd', connector_path )
        .attr( 'stroke-width', 2*this.settings.label_stroke_width )
        .attr( 'stroke', this.settings.connector_stroke )
        .attr( 'fill', 'none' );
      this.draw_connector_endpoint( label_g, connector_x_start, connector_y_start );
      this.draw_connector_endpoint( label_g, connector_x_end, connector_y_end );
      // And finally hightlight the clicked bar.
      bar.style( 'fill', this.settings.bar_highlight );
      bar.classed( 'highlighted', true );
    }
  }

  // Several helper function inside the histogram object.
  draw_connector_endpoint( g, cx, cy ){
    g.append( 'circle' )
      .attr( 'cx', cx )
      .attr( 'cy', cy )
      .attr( 'r', 3 )
      .attr( 'fill', this.settings.label_fill )
      .attr( 'stroke', this.settings.label_stroke )
      .attr( 'stroke-width', this.settings.label_stroke_width );
  }



  // // Kick off first rendering.
  render_slider() {
    // Put in the slider if there is a div defined to hold it.
    var slider_div = d3.select( 'div#' + this.elem_id ).select( '.slider' );
    if( !slider_div.empty() ){
      // Create a slider so user can set high and low value of x-axis.
      // The function sliderBottom() returns a function btw.
      var slider = d3.sliderBottom()
        .min( 0 )
        // Next line determines whether the set x.max or some X data value
        // is the biggest number to put on the slider.
        .max( d3.max( [ this.settings.x_max, d3.max( this.data, function( d ){ return d.X } ) ] ) )
        .ticks( 7 )
        .step( 50 )
        .width( 300 )
        .displayValue( false )
        .default( [ this.settings.x_min, this.settings.x_max ] )
        .fill( bar_colors[2] )
        .on( 'onchange', val => {
          // d3.select( '#value' ).text( val.join('-') );
          this.settings.x_min = val[0];
          this.settings.x_max = val[1];
          this.render_histogram();
        });

      slider_div
        .append( 'svg' )
        .attr( 'width', this.settings.figure_width )
        .attr( 'height', this.settings.figure_width / 6 )
        .append( 'g' )
        .attr( 'transform', 'translate(' + this.settings.plot_margin.left + ',' + this.settings.plot_margin.top * 1.5 + ')' )
        .call( slider );
    }
  }

} // End of class Histogram.
