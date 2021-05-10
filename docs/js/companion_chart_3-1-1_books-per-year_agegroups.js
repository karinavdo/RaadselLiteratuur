// Render histogram for age group
function HistChart( data ) {

  const self = this

  data.forEach( function( d ) {
    d.age_resp = +d['age.resp'];
    d.books_per_year = +d['books.per.year'];
  });
  this.hist_data = data;

  // Define the dimensions and margins of the graph
  margin = { top: 10, right: 30, bottom: 30, left: 30 },
      width = 260 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // Append the svg object to the appropriate div.
  this.svg = d3.select( 'div#chart_3-1-1_books-per-year_agegroups_hist' )
    .append( 'svg' )
      .attr( 'width', width + margin.left + margin.right )
      .attr( 'height', height + margin.top + margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + margin.left + ', ' + margin.top + ' )' );

  // X axis: scale and draw.
  this.xScale = d3.scaleLinear()
      .domain( [0, 200] )     // 200 is hard coded max. Use: d3.max(data, function(d) { return +d['books_per_year'] }) for calculated max.
      .range( [0, width] );
  this.svg.append( 'g' )
      .attr( 'transform', 'translate( 0, ' + height + ' )' )
      .call( d3.axisBottom( this.xScale ) );

  // Set the parameters for the histogram function.
  this.histogram = d3.histogram()
      .value( function( d ){ return d.books_per_year; } )   // I need to give the vector of value
      .domain( self.xScale.domain() )  // then the domain of the graphic
      .thresholds( self.xScale.ticks( 20 ) ); // then the numbers of bins

  // Filter to extract data for a specific age group.
  this.group_data = function( data, age_group ) {
    if( typeof( age_group ) == 'undefined' ) { age_group = [50,59] };
    // s = ( Math.floor( Math.random() * 8 ) + 1 ) * 10
    return data.filter( function( d ){ return ( +d['age.resp'] > age_group[0] & +d['age.resp'] <= age_group[1] ) } )
  }

  this.render = function( age_group ) {
    bins = self.histogram( self.group_data( self.hist_data, age_group ) );

    // Y axis: scale and draw (remove as it is redranw):
    self.svg.select( '#yaxis' ).remove();
    yScale = d3.scaleLinear()
        .range( [height, 0] );
        // yScale.domain( [ 0, d3.max( bins, function( d ){ return d.length; } ) ] );   // d3.hist has to be called before the Y axis obviously
        yScale.domain( [ 0, 800 ] );
    self.svg.append( 'g' )
        .call( d3.axisLeft( yScale ) )
        .attr( 'id', 'yaxis' );

    // append the bar rectangles to the svg element (remove for redraw):
    self.svg.selectAll( 'rect' ).remove();
    self.svg.selectAll( 'rect' )
        .data ( bins )
        .enter()
        .append( 'rect' )
          .attr( 'x', 1 )
          .attr( 'transform', function( d ){ return 'translate( ' + self.xScale( d.x0 ) + ', ' + yScale( d.length ) + ' )'; })
          .attr( 'width', function( d ){ return self.xScale( d.x1 ) - self.xScale( d.x0 ) -1 ; })
          .attr( 'height', function( d ){ return height - yScale( d.length ); })
          .style( 'fill', '#69b3a2' );
  }

  // Expects array [ lower_age, upper_age ]
  this.update = function( age_group ) {
    self.render( age_group );
  }

}

function create_hist_chart( data ) {
  hist_chart = new HistChart( data );
  hist_chart.render();
}
d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-1-1_books-per-year_agegroups_hist.csv' ).then( create_hist_chart );


// Render the mean books oer year chart
d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-1-1_books-per-year_agegroups_mean.csv' ).then( function( data ) {
  data.forEach( function( d ) {
    d.age_group = d.age_group;
    d.mean = +d.mean;
  });

  // var margin = ({top: 30, right: 0, bottom: 10, left: 60})
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 50 },
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var svg = d3.select( 'div#chart_3-1-1_books-per-year_agegroups_mean' )
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
    .attr( 'width', function( d ){ return xScale( d.mean ) } )
    .attr( 'height', yScale.bandwidth() )
    .attr( 'y', function( d ){ return yScale( d.age_group ) } )
    .attr( 'fill', function( d ){
        fill = 'steelblue';
        if( d.age_group=='50 - 59' ) { fill = '#69b3a2' };
        return fill
      } )
    .on( 'click', function( d,i ){
        d3.selectAll( '.bar' ).style( 'fill', 'steelblue' )
        d3.select( this ).style( 'fill', '#69b3a2');
        // Splits and maps e.g. '10 - 19' to [ 10, 19 ].
        hist_chart.update( i.age_group.split( ' - ' ).map( function(x) { return +x } ) )
      } );

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
