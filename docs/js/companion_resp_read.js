d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/resp_read.csv' ).then( function( data ) {

  data.forEach( function( d ) {
    d.resp_id = +d['respondent.id'];
    d.book_id = +d['book.id'];
  });

  // Define the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  // Append the svg object to the appropriate div.
  const svg = d3.select( 'div#resp_read' )
    .append( 'svg' )
      .attr( 'width', width + margin.left + margin.right )
      .attr( 'height', height + margin.top + margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + margin.left + ', ' + margin.top + ' )' );

  // X axis: scale and draw.
  const xScale = d3.scaleLinear()
      .domain( [0, 150] )     // 200 is hard coded max. Use: d3.max(data, function(d) { return +d['books_per_year'] }) for calculated max.
      .range( [0, width] );
  svg.append( 'g' )
      .attr( 'transform', 'translate( 0, ' + height + ' )' )
      .call( d3.axisBottom( xScale ) );

  // Set the parameters for the histogram function.
  const histogram = d3.histogram()
      .value( function( d ){ return d.book_id; } )   // I need to give the vector of value
      .domain( xScale.domain() )  // then the domain of the graphic
      .thresholds( xScale.ticks( 30 ) ); // then the numbers of bins

  const bins = histogram( data );

  // Y axis: scale and draw (remove as it is redranw):
  svg.select( '#yaxis' ).remove();
  const yScale = d3.scaleLinear()
      .range( [height, 0] );
      // yScale.domain( [ 0, d3.max( bins, function( d ){ return d.length; } ) ] );   // d3.hist has to be called before the Y axis obviously
      yScale.domain( [ 0, 5000 ] );
  svg.append( 'g' )
      .call( d3.axisLeft( yScale ) )
      .attr( 'id', 'yaxis' );

  // append the bar rectangles to the svg element (remove for redraw):
  svg.selectAll( 'rect' ).remove();
  svg.selectAll( 'rect' )
      .data ( bins )
      .enter()
      .append( 'rect' )
        .attr( 'x', 1 )
        .attr( 'transform', function( d ){ return 'translate( ' + xScale( d.x0 ) + ', ' + yScale( d.length ) + ' )'; })
        .attr( 'width', function( d ){ return xScale( d.x1 ) - xScale( d.x0 ) -1 ; })
        .attr( 'height', function( d ){ return height - yScale( d.length ); })
        .style( 'fill', '#69b3a2' );

});
