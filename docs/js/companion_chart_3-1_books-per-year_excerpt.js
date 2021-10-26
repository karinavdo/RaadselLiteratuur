d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-1_books-per-year.csv' ).then( function( data ) {

  const xAxisTitle_en = 'Number of books read annually';
  const yAxisTitle_en = 'Number of respondents';
  const xAxisTitle_nl = 'Aantal gelezen boeken per jaar';
  const yAxisTitle_nl = 'Aantal respondenten';

  const axisStyle = 'font-size:11pt; font-family:PT Sans;';
  const scaleStyle = 'font-size:11pt; font-family:Helvetica Neue;';

  const label_y_distance = 75;
  const label_x_padding = 10;
  const label_y_padding = 4;
  const label_stroke = 'rgb(66, 77, 108)';
  const connector_stroke = 'rgb(134, 148, 189)';
  const label_stroke_width = 1;
  const label_fill = 'rgb(219, 228, 255)';

  const bar_highlight = '#6c84ce'

  data.forEach( function( d ) {
    d.resp_id = +d['respondent.id'];
    d.book_per_year = +d['books.per.year'];
  });

  const figure_height = 600;
  const figure_width = 400;

  // Define the dimensions and margins of the graph
  // const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  // Not sure yet if setting larger margins is best for axis labels plotting
  const plot_margin = { top: 20, right: 20, bottom: 70, left: 80 },
      plot_width = figure_width - plot_margin.left - plot_margin.right,
      plot_height = figure_height - plot_margin.top - plot_margin.bottom;


  // This actually paints the chart
  function render_hist( slider_min, slider_max ){
    // remove a possible already rendered svg
    existing_svg = d3.select( 'div#chart_3-1_books-per-year_excerpt svg' );
    if( !existing_svg.empty() ){
      existing_svg.remove();
    };

    // Append the svg object to the appropriate div.
    const svg = d3.select( 'div#chart_3-1_books-per-year_excerpt' )
      .append( 'svg' )
        .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
        .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
        .append( 'g' )
          .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

    // X axis: scale and draw.
    const xScale = d3.scaleLinear()
        // Old note: 200 was hard coded max.
        // Use: d3.max(data, function(d) { return +d['books_per_year'] })
        // for calculated max.
        .domain( [ slider_min, slider_max ] )
        .range( [0, plot_width] );
    svg.append( 'g' )
        .attr( 'transform', 'translate( 0, ' + plot_height + ' )' )
        .call( d3.axisBottom( xScale )
          .ticks( 5 ) )  // Limit ticks so they do not crowd the x axis
        .attr( 'style', scaleStyle );

    // Set the parameters for the histogram function.
    const thresholds = d3.map( xScale.ticks( 20 ), function( d ){ return d+1 } );
    // console.log( thresholds );
    // console.log( xScale.ticks( 20 ) );
    const histogram = d3.histogram()
        .value( function( d ){ return d.book_per_year; } )   // I need to give the vector of value
        .domain( xScale.domain() )  // then the domain of the graphic
        .thresholds( thresholds ); // then the numbers of bins

    const bins = histogram( data );

    const yScale = d3.scaleLinear()
        .range( [plot_height, 0] );
        // d3.hist has to be called before the Y axis obviously
        // THe 1.1 factor just adds a little 'breathing space'
        // between the maximum and the top of the chart
        yScale.domain( [ 0, ( 1.1 * d3.max( bins, function( d ){ return d.length; } ) ) ] );
        // yScale.domain( [ 0, 5000 ] );
    svg.append( 'g' )
          .call( d3.axisLeft( yScale )
                 .tickFormat( x =>  numformat( x ) ) )
          .attr( 'id', 'yaxis' )
          .attr( 'style', scaleStyle );

    // Draw bars
    svg.selectAll( 'rect' )
        .data ( bins )
        .enter()
        .append( 'rect' )
          .attr( 'transform', function( d ){ return 'translate( ' + xScale( d.x0 ) + ', ' + yScale( d.length ) + ' )'; })
          .attr( 'width', function( d ){ return xScale( d.x1 ) - xScale( d.x0 ) -1 ; })
          .attr( 'height', function( d ){ return plot_height - yScale( d.length ); })
          .style( 'fill', bar_colors[2] ) // Temporarily exchange original color '#77b5bf' for gray for print purpose.
          .on( 'click', handle_click );

    // Same thing but now for x axis
    // const gutter_height = plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
    const gutter_height = 30;
    const xAxisLabelY = figure_height - ( plot_margin.bottom / 2 );
    const xAxisLabelX = plot_width / 2;
    svg.append( 'g' )
        .attr( 'transform', 'translate(' + xAxisLabelX + ', ' + xAxisLabelY + ')' )
        .append( 'text' )
          .attr( 'text-anchor', 'middle' )
          .attr( 'style', axisStyle )
          .text( xAxisTitle_nl );

    // Render x and y axes labels
    // Compute the space left between axis ticks and edge of figure.
    const gutter_width = plot_margin.left - d3.select('#yaxis').node().getBBox().width
    // Calculate center of gutter
    const yAxisLabelX = -plot_margin.left + ( gutter_width / 2 )
    // Calculate center of y axis
    const yAxisLabelY = plot_margin.top + plot_height / 2;
    // Put y axis label center on calculated spot
    svg.append( 'g' )
        .attr( 'transform', 'translate(' + yAxisLabelX + ', ' + yAxisLabelY + ')' )
        .append( 'text' )
          .attr( 'text-anchor', 'middle' )
          .attr( 'transform', 'rotate(-90)' )
          .attr( 'style', axisStyle )
          .text( yAxisTitle_nl );

    // Hnadle clicks on the bars (toggles label with value)
    function handle_click( event, d ){
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
          .attr( 'id', "chart_bar_datum_label" )  // Create an id for text so we can select it later for removing on mouseout
          .append( 'text' )
            .attr( 'x', function() { return xScale( d.x0 ) } )
            .attr( 'y', function() { return yScale( d.length ) } )
            .attr( 'style', scaleStyle )
            .text( d.length );
        label_g = d3.select( '#chart_bar_datum_label' )
        const bbox = label_g.node().getBBox();
        // Project left x position of label box on the width
        // of the plot minus the label box width.
        // This guarantees that the label box always falls within the div
        // of the chart horizontally, and thus will be visible.
        // x * ( ( x_max - label_width ) / x_max )
        label_box_width = bbox.width + 2*label_x_padding;
        label_box_height = bbox.height + 2*label_y_padding;
        const label_box_x = bbox.x * ( ( plot_width - label_box_width ) / plot_width ) - 8;
        // For y positioning we need something too.
        label_box_y = bbox.y - label_y_padding;
        if( yScale( d.length ) > 0.5*plot_height ){
          label_box_y -= label_y_distance
        } else {
          label_box_y += label_y_distance
        }
        label_text = d3.select( '#chart_bar_datum_label text' );
        label_text.attr( 'x', label_box_x + label_x_padding );
        label_text.attr( 'y', label_box_y + label_box_height - 2*label_y_padding );
        label_g.insert( 'rect', ':first-child' )
          .attr( 'x', label_box_x )
          .attr( 'y', label_box_y )
          .attr( 'width', label_box_width )
          .attr( 'height', label_box_height )
          .attr( 'fill', label_fill )
          .attr( 'stroke', label_stroke )
          .attr( 'stroke-width', label_stroke_width );
        const connector_x_start = label_box_x + label_box_width;
        // If the box is differently positioned we need to adjust the connector too.
        if( yScale( d.length ) > 0.5*plot_height ){
          var connector_y_start = label_box_y - 0.5*label_box_height
        } else {
          var connector_y_start = label_box_y + 0.5*label_box_height
        }
        if( yScale( d.length ) > 0.5*plot_height ){
          connector_y_start += label_box_height
        }
        connector_x_end = xScale( d.x0 ) + ( ( xScale( d.x1 ) - xScale( d.x0 ) + 1 ) / 2 );
        connector_y_end = yScale( d.length );
        var connector_path = d3.path();
        connector_path.moveTo( connector_x_start, connector_y_start );
        var control_y = connector_y_start - ( ( connector_y_start - connector_y_end ) / 2 );
        var control_x = connector_x_start + 50;
        if( control_x > plot_width ) { control_x = plot_width }
        connector_path.quadraticCurveTo( control_x, control_y, connector_x_end, connector_y_end );
        label_g.append( 'path' )
          .attr( 'd', connector_path )
          .attr( 'stroke-width', 2*label_stroke_width )
          .attr( 'stroke', connector_stroke )
          .attr( 'fill', 'none' );
        label_g.append( 'circle' )
          .attr( 'cx', connector_x_start )
          .attr( 'cy', connector_y_start )
          .attr( 'r', 3 )
          .attr( 'fill', label_fill )
          .attr( 'stroke', label_stroke )
          .attr( 'stroke-width', label_stroke_width );
        label_g.append( 'circle' )
          .attr( 'cx', connector_x_end )
          .attr( 'cy', connector_y_end )
          .attr( 'r', 3 )
          .attr( 'fill', label_fill )
          .attr( 'stroke', label_stroke )
          .attr( 'stroke-width', label_stroke_width );
        bar.style( 'fill', bar_highlight );
        bar.classed( 'highlighted', true );
      }
    }

  }
  // End of the monstruous function painting the chart.

  // Put in the slider
  var slider = d3
    .sliderBottom()
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

  d3.select( '#slider' )
    .append( 'svg' )
    .attr( 'width', figure_width )
    .attr( 'height', 100)
    .append( 'g' )
    .attr( 'transform', 'translate(' + plot_margin.left + ',30)' )
    .call( slider );

  // Initial render of chart
  render_hist( 0, 200 );
});
