// Load data.
var url_csv = CSV_BASE_URL + 'resp_read_suspense.csv';
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
    x_axis_title_nl: 'Spanning',
    y_axis_title_nl: 'Respondenten',
    x_axis_title_en: 'Suspense',
    y_axis_title_en: 'Respondents',
    num_x_ticks: 4,
    num_y_ticks: 4,
    figure_height: 220,
    figure_width: 180,
    bins_hint: 10,
    axis_style: 'font-size:9pt; font-family:PT Sans;',
  }
  // Create the histogram.
  new Histogram( data, 'resp_read_suspense', options );
  var enlarger_options = {
    x_axis_title_nl: 'Spanning',
    y_axis_title_nl: 'Respondenten',
    x_axis_title_en: 'Suspense',
    y_axis_title_en: 'Respondents',
  }
  d3.select( '#resp_read_suspense' )
    .on( 'click', function(){ enlarge( 'resp_read_suspense', enlarger_options ) } )
});
