// Load data.
var url_csv = 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-2_read-of-401.csv';
// Transform data.
d3.csv( url_csv ).then( function( data ) {
  data.forEach( function( d ) {
    d.Y = +d['respondent_id'];
    d.X = +d['books.read'];
  });
  // Call the histogram rendering function
  var options = {
    x_axis_title_nl: 'Aantal boeken gelezen van de 401 titels',
    y_axis_title_nl: 'Aantal respondenten',
    bins_hint: 20,
    x_min: 0,
    x_max: 250,
    y_max: 6000
  }
  new Histogram( data, 'chart_3-2_read-of-401', options );
});
