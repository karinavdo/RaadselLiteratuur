function render_histogram( d, elem_id, options ){

  //Create a copy of the defaults
  var settings = Object.assign( {}, COMPANION.HISTOGRAM.DEFAULTS );
  settings = Object.assign( settings, options );

  // Actual rendering function.
  function render_hist( x_min, x_max ){

    // remove a possible already rendered svg
    existing_svg = d3.select( 'div#' + elem_id + ' .plot svg' );
    if( !existing_svg.empty() ){
      existing_svg.remove();
    };

    // Append the svg object to the appropriate div.
    const svg = d3.select( 'div#' + elem_id + ' .plot' )
      .append( 'svg' )
        .attr( 'width', settings.plot_width + settings.plot_margin.left + settings.plot_margin.right )
        .attr( 'height', settings.plot_height + settings.plot_margin.top + settings.plot_margin.bottom )
        .append( 'g' )
          .attr( 'transform', 'translate( ' + settings.plot_margin.left + ', ' + settings.plot_margin.top + ' )' );

    // X axis: scale and draw.
    const xScale = d3.scaleLinear()
        // Old note: 200 was hard coded max.
        // Use: d3.max(data, function(d) { return +d['books_per_year'] })
        // for calculated max.
        .domain( [ x_min, x_max ] )
        .range( [0, settings.plot_width] );
    svg.append( 'g' )
        .attr( 'transform', 'translate( 0, ' + settings.plot_height + ' )' )
        .call( d3.axisBottom( xScale )
          .ticks( 5 ) )  // Limit ticks so they do not crowd the x axis
        .attr( 'style', settings.scale_style );

    // Set the parameters for the histogram function.
    const thresholds = d3.map( xScale.ticks( 20 ), function( d ){ return d+1 } );
    // console.log( thresholds );
    // console.log( xScale.ticks( 20 ) );
    const histogram = d3.histogram()
        .value( function( d ){ return d.book_per_year; } )   // Inject values.
        .domain( xScale.domain() )  // Then the domain of the graphic.
        .thresholds( thresholds ); // Then the cut points of the bins.

    const bins = histogram( d );

    const yScale = d3.scaleLinear()
        .range( [settings.plot_height, 0] );
        // d3.hist has to be called before the Y axis obviously.
        // The 1.1 factor just adds a little 'breathing space'
        // between the maximum and the top of the chart.
        yScale.domain( [ 0, ( 1.1 * d3.max( bins, function( d ){ return d.length; } ) ) ] );
        // yScale.domain( [ 0, 5000 ] );
    svg.append( 'g' )
          .call( d3.axisLeft( yScale )
                 .tickFormat( x =>  numformat( x ) ) )
          .attr( 'id', 'yaxis' )
          .attr( 'style', settings.scale_style );

    // Draw bars
    svg.selectAll( 'rect' )
        .data ( bins )
        .enter()
        .append( 'rect' )
          .attr( 'transform', function( d ){ return 'translate( ' + xScale( d.x0 ) + ', ' + yScale( d.length ) + ' )'; })
          .attr( 'width', function( d ){ return xScale( d.x1 ) - xScale( d.x0 ) -1 ; })
          .attr( 'height', function( d ){ return settings.plot_height - yScale( d.length ); })
          .style( 'fill', bar_colors[2] ) // Temporarily exchange original color '#77b5bf' for gray for print purpose.
          .on( 'click', toggle_data_point_label );

    // Same thing but now for x axis
    // const gutter_height = settings.plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
    const gutter_height = 30;
    const xAxisLabelY = settings.figure_height - ( settings.plot_margin.bottom / 2 );
    const xAxisLabelX = settings.plot_width / 2;
    svg.append( 'g' )
        .attr( 'transform', 'translate(' + xAxisLabelX + ', ' + xAxisLabelY + ')' )
        .append( 'text' )
          .attr( 'text-anchor', 'middle' )
          .attr( 'style', settings.axis_style )
          .text( settings.x_axis_title_nl );

    // Render x and y axes labels.
    // Compute the space left between axis ticks and edge of figure.
    const gutter_width = settings.plot_margin.left - d3.select('#yaxis').node().getBBox().width
    // Calculate center of gutter.
    const yAxisLabelX = -settings.plot_margin.left + ( gutter_width / 2 )
    // Calculate center of y axis.
    const yAxisLabelY = settings.plot_margin.top + settings.plot_height / 2;
    // Put y axis label center on calculated spot.
    svg.append( 'g' )
        .attr( 'transform', 'translate(' + yAxisLabelX + ', ' + yAxisLabelY + ')' )
        .append( 'text' )
          .attr( 'text-anchor', 'middle' )
          .attr( 'transform', 'rotate(-90)' )
          .attr( 'style', settings.axis_style )
          .text( settings.y_axis_title_nl );

    // Handle clicks on the bars (toggles label with value).
    function toggle_data_point_label( event, d ){
      bar = d3.select( this );
      // We remove anything to do with highlighting and labeling.
      // Essentially this is 'toggle off'.
      svg.selectAll( 'rect' ).style( 'fill', bar_colors[2] );
      chart_bar_datum_label = d3.select( '#chart_bar_datum_label' )
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
          .attr( 'id', "chart_bar_datum_label" )
          .append( 'text' )
            .attr( 'x', function() { return xScale( d.x0 ) } )
            .attr( 'y', function() { return yScale( d.length ) } )
            .attr( 'style', settings.scale_style )
            .text( d.length );

        // Now we need some calculations to determine location
        // of label and the connector to the data point.
        var label_g = d3.select( '#chart_bar_datum_label' )
        var bbox = label_g.node().getBBox();
        // Project left x position of label box on the width
        // of the plot minus the label box width.
        // This guarantees that the label box always falls within the div
        // of the chart horizontally, and thus will be visible.
        var label_box_width = bbox.width + 2*settings.label_x_padding;
        var label_box_height = bbox.height + 2*settings.label_y_padding;
        var label_box_x = bbox.x * ( ( settings.plot_width - label_box_width ) / settings.plot_width ) - 8;
        // For y positioning we need something too.
        var label_box_y = bbox.y - settings.label_y_padding + settings.label_y_distance;
        if( yScale( d.length ) > 0.5*settings.plot_height ){
          label_box_y = bbox.y - settings.label_y_padding - settings.label_y_distance;
        }
        var connector_y_start = label_box_y + 0.5*label_box_height;
        var connector_x_start = label_box_x + label_box_width;
        var connector_x_end = xScale( d.x0 ) + ( ( xScale( d.x1 ) - xScale( d.x0 ) + 1 ) / 2 );
        var connector_y_end = yScale( d.length );

        //Now we draw label and connector.
        label_text = d3.select( '#chart_bar_datum_label text' );
        label_text.attr( 'x', label_box_x + settings.label_x_padding );
        label_text.attr( 'y', label_box_y + label_box_height - 2*settings.label_y_padding );
        label_g.insert( 'rect', ':first-child' )
          .attr( 'x', label_box_x )
          .attr( 'y', label_box_y )
          .attr( 'width', label_box_width )
          .attr( 'height', label_box_height )
          .attr( 'fill', settings.label_fill )
          .attr( 'stroke', settings.label_stroke )
          .attr( 'stroke-width', settings.label_stroke_width );
        var connector_path = d3.path();
        connector_path.moveTo( connector_x_start, connector_y_start );
        var control_y = connector_y_start - ( ( connector_y_start - connector_y_end ) / 2 );
        var control_x = connector_x_start + 50;
        if( control_x > settings.plot_width ) { control_x = settings.plot_width }
        connector_path.quadraticCurveTo( control_x, control_y, connector_x_end, connector_y_end );
        label_g.append( 'path' )
          .attr( 'd', connector_path )
          .attr( 'stroke-width', 2*settings.label_stroke_width )
          .attr( 'stroke', settings.connector_stroke )
          .attr( 'fill', 'none' );
        draw_connector_endpoint( label_g, connector_x_start, connector_y_start );
        draw_connector_endpoint( label_g, connector_x_end, connector_y_end );

        // And finally hightlight the clicked bar.
        bar.style( 'fill', settings.bar_highlight );
        bar.classed( 'highlighted', true );
      }
    }

    function draw_connector_endpoint( g, cx, cy ){
      g.append( 'circle' )
        .attr( 'cx', cx )
        .attr( 'cy', cy )
        .attr( 'r', 3 )
        .attr( 'fill', settings.label_fill )
        .attr( 'stroke', settings.label_stroke )
        .attr( 'stroke-width', settings.label_stroke_width );
    }

  }
  // End of function render_hist (rendering the chart).

  // Create a slider so user can set high and low value of x-axis.
  // The function sliderBottom() returns a function btw.
  var slider = d3.sliderBottom()
    .min( 0 )
    .max( 700 )
    .ticks( 7 )
    .step( 50 )
    .width( 300 )
    .displayValue( false )
    .default( [0, 200] )
    .fill( bar_colors[2] )
    .on( 'onchange', val => {
      // d3.select( '#value' ).text( val.join('-') );
      render_hist( val[0], val[1] );
    });

  // Put in the slider if there is a div defined to hold it.
  var slider_div = d3.select( 'div#' + elem_id ).select( '.slider' );
  if( !slider_div.empty() ){
    slider_div
      .append( 'svg' )
      .attr( 'width', settings.figure_width )
      .attr( 'height', 100)
      .append( 'g' )
      .attr( 'transform', 'translate(' + settings.plot_margin.left + ',30)' )
      .call( slider );
  }
  
  // Initial render of chart
  render_hist( 0, 200 );

}
