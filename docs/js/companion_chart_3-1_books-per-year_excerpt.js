// Load data.
const url_csv = 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-1_books-per-year.csv';
// Transform data.
d3.csv( url_csv ).then( function( data ) {
  data.forEach( function( d ) {
    d.resp_id = +d['respondent.id'];
    d.book_per_year = +d['books.per.year'];
  });
  // Call the histogram rendering function
  var options = {
    x_axis_title_nl: 'Aantal gelezen boeken per jaar',
    y_axis_title_nl: 'Aantal respondenten'
  }
  render_histogram( data, 'chart_3-1_books-per-year_excerpt', options );
});
