// Load data.
var url_csv = CSV_BASE_URL + 'chart_4-1_sarah.csv';
d3.csv( url_csv ).then( function( data ) {
  // Set some options.
  var options = {
    x_axis_title_nl: 'Score',
    y_axis_title_nl: 'Aantal respondenten',
    figure_height: 400,
    figure_width: 680,
    // Only margin right is different, take care of this in differently
    // named default?
    plot_margin: { top: 20, right: 200, bottom: 70, left: 80 }
  }
  // Create the barchart.
  new Barchart( data, 'chart_4-1_sarah', options );
});
