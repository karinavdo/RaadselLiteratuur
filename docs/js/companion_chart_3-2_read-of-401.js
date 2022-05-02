// Load data.
var url_csv = CSV_BASE_URL + 'chart_3-2_read-of-401.csv';
d3.csv( url_csv ).then( function( data ) {
  // Transform data.
  data.forEach( function( d ) {
    d.Y = +d['respondent_id'];
    d.X = +d['books.read'];
  });
  // Set necessary options.
  var options = {
    x_axis_title_nl: 'Aantal boeken gelezen van de 401 titels',
    y_axis_title_nl: 'Aantal respondenten',
    x_axis_title_en: 'Number of books read of the 401 books',
    y_axis_title_en: 'Number of respondents',
    bins_hint: 20,
    x_min: 0,
    x_max: 250,
    y_max: 6000
  }
  // Careate the histogram.
  new Histogram( data, 'chart_3-2_read-of-401', options );
});
