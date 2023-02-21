// Load data.
var url_csv = CSV_BASE_URL + 'chart_4-4_quality-by-genre.csv';
d3.csv( url_csv ).then( function( data ) {
  // Set some options.
  var options = {
    group_column: 'score',
    x_axis_title_nl: 'Gemiddelde score',
    y_axis_title_nl: 'Aantal boeken',
    x_axis_title_en: 'Rounded mean score',
    y_axis_title_en: 'Number of books',
    figure_height: 400,
    figure_width: 780,
    // Only margin right is different, take care of this in differently
    // named default?
    plot_margin: { top: 20, right: 200, bottom: 70, left: 80 },
    series_labels_nl: {
      'quality_fiction': 'Literaire roman',
      'quality_suspense': 'Spanning',
      'quality_romantic': 'Romantiek',
      'quality_other': 'Overige'
    },
    series_labels_en: {
      'quality_fiction': 'Literary novel',
      'quality_suspense': 'Suspense',
      'quality_romantic': 'Romance',
      'quality_other': 'Other'
     }
  }
  // Create the barchart.
  new Barchart( data, 'chart_4-4_quality-by-genre', options );
});
