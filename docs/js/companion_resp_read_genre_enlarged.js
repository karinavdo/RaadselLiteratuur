function enlarge( element_id, options ) {

  // Load data.
  var url_csv = CSV_BASE_URL + element_id + '.csv';
  d3.csv( url_csv ).then( function( data ) {
    // Transform data.
    data.forEach( function( d ) {
      d.Y = +d['respondent.id'];
      d.X = +d['book.id'];
    });
    // Set some options.
    var enlarger_options = {
      x_max: 60,
      y_max: 4000,
      figure_height: 500,
      figure_width: 500,
      bins_hint: 40,
      slider_step:  0,
      slider_ticks: 10
    }
    enlarger_options = Object.assign( enlarger_options, options );
    // Create the histogram.
    new Histogram( data, 'resp_read_genre_enlarged', enlarger_options );
  });

}
