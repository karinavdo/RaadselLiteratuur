d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/age_read_mean.csv' ).then( function( data ) {
  data.forEach( function( d ) {
    d.age_group = d.age_group;
    d.mean = +d.mean;
  });

  // var margin = ({top: 30, right: 0, bottom: 10, left: 60})
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 50 },
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var svg = d3.select( 'div#age_read_mean' )
    .append( 'svg' )
    .attr( 'width', width + margin.left + margin.right )
    .attr( 'height', height + margin.top + margin.bottom )
      .append( 'g' )
      .attr( 'transform', 'translate( ' + margin.left + ', ' + margin.top + ' )' );

  var xScale = d3
    .scaleLinear().domain( [ 0, 60 ] ).range( [ 0, width ] );

  var yScale = d3
    .scaleBand()
    .domain( data.map( function( d ){ return d.age_group } ) )
    .rangeRound( [ 0, height ] )
    .padding( 0.2 );

  var bars = svg
    .selectAll( '.bar' )
    .data( data )
    .enter()
    .append( 'rect' )
    .classed( 'bar', true )
    .attr( 'width', function( data ){ return xScale( data.mean ) } )
    .attr( 'height', yScale.bandwidth() )
    .attr( 'y', function( data ){ return yScale( data.age_group ) } )
    .on( 'click', function(){ console.log( 'Until it goes "click".' ) } );

  svg.append('g')
    .attr( 'fill', 'white' )
    .attr( 'text-anchor', 'end' )
    .attr( 'font-family', 'sans-serif' )
    .attr( 'font-size', 12 )
    .selectAll( 'text' )
      .data( data )
      .join( 'text' )
        .attr( 'x', function( d ){ return xScale( d.mean ) } )
        .attr( 'y', function( d ){ return yScale( d.age_group ) + yScale.bandwidth() / 2 } )
        .attr( 'dy', '0.35em')
        .attr( 'dx', -4 )
        .text( function( d ){ return d.mean.toFixed( 2 ) } )
          .call(
            function( text ){
              return text.filter(
                function( d ){ return ( xScale( d.mean ) - xScale( 0 ) ) < 20 }
              ) // In case of short bars
              .attr( 'dx', +4 )
              .attr( 'fill', 'black' )
              .attr( 'text-anchor', 'start' )
            }
          );

  svg.append( 'g' )
      .call( d3.axisLeft( yScale ).tickFormat( data.age_group ).tickSizeOuter(0) )

  svg.append( 'g' )
      .attr( 'transform', 'translate( 0, ' + height + ' )')
      .call( d3.axisBottom( xScale ).ticks( width/100, 's' ) )

});

d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/age_read.csv' ).then( function( data ) {
  data.forEach( function( d ) {
    d.age_resp = +d['age.resp'];
    d.books_per_year = +d['books.per.year'];
  });

  var group_data = function() {
    s = ( Math.floor( Math.random() * 8 ) + 1 ) * 10
    return data.filter( function( d ){ return ( +d['age.resp'] > s & +d['age.resp'] < s+10 ) } )
  }

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 30 },
      width = 260 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select( 'div#age_read_hist' )
    .append( 'svg' )
      .attr( 'width', width + margin.left + margin.right )
      .attr( 'height', height + margin.top + margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + margin.left + ', ' + margin.top + ' )' );

  render_hist = function() {

    // X axis: scale and draw:
    var x = d3.scaleLinear()
        .domain( [0, 200] )     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range( [0, width] );
    svg.append( 'g' )
        .attr( 'transform', 'translate( 0, ' + height + ' )' )
        .call( d3.axisBottom( x ) );

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value( function( d ){ return d.books_per_year; } )   // I need to give the vector of value
        .domain( x.domain() )  // then the domain of the graphic
        .thresholds( x.ticks( 20 ) ); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram( group_data() );

    svg.select( '#yaxis' ).remove();

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range( [height, 0] );
        y.domain( [ 0, d3.max( bins, function( d ){ return d.length; } ) ] );   // d3.hist has to be called before the Y axis obviously
    svg.append( 'g' )
        .call( d3.axisLeft( y ) )
        .attr( 'id', 'yaxis' );

    svg.selectAll( 'rect' ).remove();

    // append the bar rectangles to the svg element
    svg.selectAll( 'rect' )
        .data (bins )
        .enter()
        .append( 'rect' )
          .attr( 'x', 1 )
          .attr( 'transform', function( d ){ return 'translate( ' + x( d.x0 ) + ', ' + y( d.length ) + ' )'; })
          .attr( 'width', function( d ){ return x( d.x1 ) - x( d.x0 ) -1 ; })
          .attr( 'height', function( d ){ return height - y( d.length ); })
          .style( 'fill', '#69b3a2' )
          .on( 'click', render_hist );

  }

  render_hist();
});
