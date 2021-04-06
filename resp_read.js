// Render histogram for age group
function HistChart( data ) {

  const self = this

  data.forEach( function( d ) {
    d.age_resp = +d['respondent.id'];
    d.books_per_year = +d['book.id'];
  });
  this.hist_data = data;

  // Define the dimensions and margins of the graph
  margin = { top: 10, right: 30, bottom: 30, left: 30 },
      width = 260 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // Append the svg object to the appropriate div.
  this.svg = d3.select( 'div#age_read_hist' )
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
d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/resp_read.csv' ).then( create_hist_chart );
