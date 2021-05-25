d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-2_read-of-401.csv' ).then( function( data ) {

  const xAxisTitle = 'Number of books read from the 401 titles';
  const yAxisTitle = 'Number of respondents';

  data.forEach( function( d ) {
    d.resp_id = +d['respondent_id'];
    d.books_read = +d['books.read'];
  });

  const figure_height = 600;
  const figure_width = 400;

  // Define the dimensions and margins of the graph
  // const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  // Not sure yet if setting larger margins is best for axis labels plotting
  const plot_margin = { top: 20, right: 20, bottom: 70, left: 80 },
      plot_width = figure_width - plot_margin.left - plot_margin.right,
      plot_height = figure_height - plot_margin.top - plot_margin.bottom;

  // Append the svg object to the appropriate div.
  const svg = d3.select( 'div#chart_3-2_read-of-401' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // X axis: scale and draw.
  const xScale = d3.scaleLinear()
      .domain( [0, 250] )     // 200 is hard 25ded max. Use: d3.max(data, function(d) { return +d['books_per_year'] }) for calculated max.
      .range( [0, plot_width] );
  svg.append( 'g' )
      .attr( 'transform', 'translate( 0, ' + plot_height + ' )' )
      .call( d3.axisBottom( xScale ) );

  // Set the parameters for the histogram function.
  const histogram = d3.histogram()
      .value( function( d ){ return d.books_read; } )   // I need to give the vector of value
      .domain( xScale.domain() )  // then the domain of the graphic
      .thresholds( xScale.ticks( 30 ) ); // then the numbers of bins

  const bins = histogram( data );

  const yScale = d3.scaleLinear()
      .range( [plot_height, 0] );
      // yScale.domain( [ 0, d3.max( bins, function( d ){ return d.length; } ) ] );   // d3.hist has to be called before the Y axis obviously
      yScale.domain( [ 0, 6000 ] );
  svg.append( 'g' )
        .call( d3.axisLeft( yScale ) )
        .attr( 'id', 'yaxis' )

  // Draw bars
  svg.selectAll( 'rect' )
      .data ( bins )
      .enter()
      .append( 'rect' )
        .attr( 'x', 1 )
        .attr( 'transform', function( d ){ return 'translate( ' + xScale( d.x0 ) + ', ' + yScale( d.length ) + ' )'; })
        .attr( 'width', function( d ){ return xScale( d.x1 ) - xScale( d.x0 ) -1 ; })
        .attr( 'height', function( d ){ return plot_height - yScale( d.length ); })
        .style( 'fill', '#77b5bf' );


  // Same thing but now for x axis
  // const gutter_height = plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
  const gutter_height = 30;
  const xAxisLabelY = figure_height - ( plot_margin.bottom / 2 );
  const xAxisLabelX = plot_width / 2;
  svg.append( 'g' )
      .attr( 'transform', 'translate(' + xAxisLabelX + ', ' + xAxisLabelY + ')' )
      .append( 'text' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'style', 'font-size:80%' )
        .text( xAxisTitle );

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
        .attr( 'style', 'font-size:80%' )
        .text( yAxisTitle );

});
