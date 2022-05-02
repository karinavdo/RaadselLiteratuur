// Load data.
var url_csv = CSV_BASE_URL + 'chart_4-1_sarah.csv';
d3.csv( url_csv ).then( function( data ) {
  // Different order of the columns was required, so…
  data.columns = [ '', 'score', 'literariness', 'quality' ]
  // Set some options.
  var options = {
    group_column: 'score',
    x_axis_title_nl: 'Score',
    y_axis_title_nl: 'Aantal respondenten',
    x_axis_title_en: 'Score',
    y_axis_title_en: 'Number of respondents',
    figure_height: 400,
    figure_width: 680,
    // Only margin right is different, take care of this in differently
    // named default?
    plot_margin: { top: 20, right: 200, bottom: 70, left: 80 },
    series_labels_nl: { 'literariness': 'Literaire kwaliteit', 'quality': 'Algemene kwaliteit' },
    series_labels_en: { 'literariness': 'Litery quality', 'quality': 'General quality' }
  }
  // Create the barchart.
  new Barchart( data, 'chart_4-1_sarah', options );
});
