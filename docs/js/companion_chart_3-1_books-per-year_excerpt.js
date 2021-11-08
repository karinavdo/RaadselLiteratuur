// Load data.
var url_csv = CSV_BASE_URL + 'chart_3-1_books-per-year.csv';
d3.csv( url_csv ).then( function( data ) {
  // Transform data.
  data.forEach( function( d ) {
    d.Y = +d['respondent.id'];
    d.X = +d['books.per.year'];
  });
  // Set some options.
  var options = {
    x_axis_title_nl: 'Aantal gelezen boeken per jaar',
    y_axis_title_nl: 'Aantal respondenten',
    x_min: 0,
    x_max: 200
  }
  // Create the histogram.
  new Histogram( data, 'chart_3-1_books-per-year_excerpt', options );
});
