// Load data.
var url_csv = CSV_BASE_URL + 'chart_4-2_mean.csv';
d3.csv( url_csv ).then( function( data ) {
  // Different order of the columns was required, so…
  data.columns = [ '', 'score', 'literariness', 'quality' ]
  // Set some options.
  var options = {
    group_column: 'score',
    x_axis_title_nl: 'Gemiddelde score',
    y_axis_title_nl: 'Aantal boeken',
    x_axis_title_en: 'Rounded mean score',
    y_axis_title_en: 'Number of books',
    figure_height: 400,
    figure_width: 680,
    // Only margin right is different, take care of this in differently
    // named default?
    plot_margin: { top: 20, right: 200, bottom: 70, left: 80 },
    series_labels_nl: { 'literariness': 'Literaire kwaliteit', 'quality': 'Algemene kwaliteit' },
    series_labels_en: { 'literariness': 'Literary quality', 'quality': 'General quality' }
  }
  // Create the barchart.
  new Barchart( data, 'chart_4-2_mean', options );
});
