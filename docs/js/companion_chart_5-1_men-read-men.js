// Load data.
var url_csv = CSV_BASE_URL + 'chart_5-1_men-read-men.csv'; //'chart_4-1_sarah.csv';
d3.csv( url_csv ).then( function( data ) {
  // Different order of the columns was required, so…
  // data.columns = [ '', 'score', 'literariness', 'quality' ]
  // Set some options.
  var options = {
    group_column: 'group',
    group_labels: { 'author_man': 'man', 'author_woman': 'vrouw '},
    x_axis_title_nl: 'Auteur',
    y_axis_title_nl: 'Aantal gelezen boeken',
    y_max: 200000,
    num_y_ticks: 5,
    figure_height: 350,
    figure_width: 480,
    // Only margin right is different, take care of this in differently
    // named default?
    plot_margin: { top: 20, right: 200, bottom: 70, left: 110 },
    series_labels: { 'men_readers': 'Lezer is man', 'women_readers': 'Lezer is vrouw' }
  }
  // Create the barchart.
  new Barchart( data, 'chart_5-1_men-read-men', options );
});
