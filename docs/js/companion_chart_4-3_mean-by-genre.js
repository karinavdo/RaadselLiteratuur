// Load data.
var url_csv = CSV_BASE_URL + 'chart_4-3_mean-by-genre.csv';
d3.csv( url_csv ).then( function( data ) {
  // Set some options.
  var options = {
    x_axis_title_nl: 'Gemiddelde score',
    y_axis_title_nl: 'Aantal boeken',
    figure_height: 400,
    figure_width: 780,
    // Only margin right is different, take care of this in differently
    // named default?
    plot_margin: { top: 20, right: 200, bottom: 70, left: 80 },
    series_labels: {
      'literariness_fiction': 'Literaire roman',
      'literariness_suspense': 'Spanning',
      'literariness_romantic': 'Romantiek',
      'literariness_other': 'Overige'
     }
  }
  // Create the barchart.
  new Barchart( data, 'chart_4-3_mean-by-genre', options );
});
