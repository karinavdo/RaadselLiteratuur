// Load data.
var url_csv = CSV_BASE_URL + 'resp_read_fiction.csv';
d3.csv( url_csv ).then( function( data ) {
  // Transform data.
  data.forEach( function( d ) {
    d.Y = +d['respondent.id'];
    d.X = +d['book.id'];
  });
  // Set some options.
  var options = {
    x_max: 60,
    y_max: 6000,
    x_axis_title_nl: 'Literaire roman',
    y_axis_title_nl: 'Respondenten',
    x_axis_title_en: 'Literary novel',
    y_axis_title_en: 'Respondents',
    num_x_ticks: 4,
    num_y_ticks: 4,
    figure_height: 220,
    figure_width: 180,
    bins_hint: 10,
    axis_style: 'font-size:9pt; font-family:PT Sans;',
  }
  // Create the histogram.
  new Histogram( data, 'resp_read_fiction', options );
  var enlarger_options = {
    x_axis_title_nl: 'Literaire roman',
    y_axis_title_nl: 'Respondenten',
    x_axis_title_en: 'Literary novel',
    y_axis_title_en: 'Respondents',
  }
  d3.select( '#resp_read_fiction' )
    .on( 'click', function(){ enlarge( 'resp_read_fiction', enlarger_options ) } );
  // This one's unique in comparison to the other fragments on this page.
  // It sets off the very first rendering of the enlarged chart.
  enlarge( 'resp_read_fiction', enlarger_options );
});
