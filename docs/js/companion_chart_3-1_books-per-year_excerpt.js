// Load data.
var url_csv = 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-1_books-per-year.csv';
// Transform data.
d3.csv( url_csv ).then( function( data ) {
  data.forEach( function( d ) {
    d.Y = +d['respondent.id'];
    d.X = +d['books.per.year'];
  });
  // Call the histogram rendering function
  var options = {
    x_axis_title_nl: 'Aantal gelezen boeken per jaar',
    y_axis_title_nl: 'Aantal respondenten',
    x_min: 0,
    x_max: 200
  }
  new Histogram( data, 'chart_3-1_books-per-year_excerpt', options );
});
