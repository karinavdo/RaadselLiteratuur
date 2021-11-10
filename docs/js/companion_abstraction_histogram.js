class Histogram{

// Todo: abstract bar_colors into settings?

  constructor( data, elem_id, options ){
    this.data = data;
    this.elem_id = elem_id;
    this.options = options;

    // Create a copy of the defaults.
    this.settings = Object.assign( {}, COMPANION.HISTOGRAM.DEFAULTS );
    this.settings = Object.assign( this.settings, this.options );

    this.settings.plot_width = this.settings.figure_width - this.settings.plot_margin.left - this.settings.plot_margin.right;
    this.settings.plot_height = this.settings.figure_height - this.settings.plot_margin.top - this.settings.plot_margin.bottom;

    this.data_point_labeler = new DataPointLabeler( this );

    this.render_histogram();
    this.render_slider();
  }


  // Function that actually draws the histogram.
  render_histogram(){

    this.svg = d3.select( 'div#' + this.elem_id + ' .plot' );

    // Remove a possible already rendered svg.
    if( !this.svg.select( 'svg' ).empty() ){
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
    this.x_scale = d3.scaleLinear()
      .domain( [ this.settings.x_min, this.settings.x_max ] )
      .range( [0, this.settings.plot_width] );
    this.svg.append( 'g' )
      .attr( 'transform', 'translate( 0, ' + this.settings.plot_height + ' )' )
      .call( d3.axisBottom( this.x_scale )
        .ticks( this.settings.num_x_ticks ) )  // Limit ticks so they do not crowd the x axis
      .attr( 'style', this.settings.scale_style );

    // Set the parameters for the histogram function.
    this.thresholds = d3.map( this.x_scale.ticks( this.settings.bins_hint ), function( d ){ return d+1 } );
    this.histogram = d3.histogram()
      .value( function( d ){ return d.X; } )   // Inject values.
      .domain( this.x_scale.domain() )  // Then the domain of the graphic.
      .thresholds( this.thresholds ); // Then the cut points of the bins.

    this.bins = this.histogram( this.data );

    // Y axis: scale and draw.
    // Determines axis settings.
    if( typeof this.settings.y_min=='undefined' ){
      this.settings.y_min = 0
    };
    // Note that this.settings.y_max is copied to this.y_max.
    // This is to ensure that the y axis keeps dynamically
    // scaling if not set. If it is set it doesn't scale.
    this.y_max = this.settings.y_max;
    if( typeof this.settings.y_max=='undefined' ){
      this.y_max = d3.max( this.bins, function( d ){ return d.length } );
    };

    // Create Y scale.
    this.y_scale = d3.scaleLinear()
      .range( [this.settings.plot_height, 0] );
    // d3.hist has to be called before the Y axis obviously.
    // The 1.1 factor just adds a little 'breathing space'
    // between the maximum and the top of the chart.

    this.y_scale.domain( [ this.settings.y_min, ( 1.1 * this.y_max ) ] ).nice();
    this.svg.append( 'g' )
      .call( d3.axisLeft( this.y_scale )
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
        .attr( 'transform', function( d ){ return 'translate( ' + _this.x_scale( d.x0 ) + ', ' + _this.y_scale( d.length ) + ' )'; })
        .attr( 'width', function( d ){ return _this.x_scale( d.x1 ) - _this.x_scale( d.x0 ) -1 ; })
        .attr( 'height', function( d ){ return _this.settings.plot_height - _this.y_scale( d.length ); })
        .style( 'fill', bar_colors[2] )
        .on( 'click', function( evt, d ){ _this.data_point_labeler.toggle_data_point_label( d, this ) } );
        // .on( 'click', function( evt, d ){ _this.toggle_data_point_label( d, this ) } );

    // Render x axis label.
    // TODO:
    // const gutter_height = settings.plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
    this.gutter_height = 30;
    this.x_axis_label_y = this.settings.figure_height - ( this.settings.plot_margin.bottom / 2 );
    this.x_axis_label_x = this.settings.plot_width / 2;
    this.svg.append( 'g' )
      .attr( 'transform', 'translate(' + this.x_axis_label_x + ', ' + this.x_axis_label_y + ')' )
      .append( 'text' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'style', this.settings.axis_style )
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

  } // End function render_histogram


  // Several helper functions for the Histogram class.
  // Helper function to detemine num of y ticks
  y_ticks(){
    var n = this.settings.num_y_ticks;
    var max_Y = d3.max( this.bins, function( d ){ return d.length; } );
    if( max_Y < 5 ){
      n = max_Y
    }
    return n
  }


  // Put in a slider
  render_slider() {
    // Put in the slider if there is a div defined to hold it.
    var slider_div = d3.select( 'div#' + this.elem_id ).select( '.slider' );
    if( !slider_div.empty() ){
      // There may be an old slider in place. If so, remove it.
      var slider_div_svg = d3.select( 'div#' + this.elem_id ).select( '.slider svg' );
      if( !slider_div_svg.empty() ){
        slider_div_svg.remove();
      };
      // Create a slider so user can set high and low value of x-axis.
      // The function sliderBottom() returns a function btw.
      var slider = d3.sliderBottom()
        .min( 0 )
        // Next line determines whether the set x.max or some X data value
        // is the biggest number to put on the slider.
        .max( d3.max( [ this.settings.x_max, d3.max( this.data, function( d ){ return d.X } ) ] ) )
        .ticks( this.settings.slider_ticks )
        .step( this.settings.slider_step )
        .width( this.settings.figure_width - 100 )
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
