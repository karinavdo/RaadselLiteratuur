BAR_COLORS = [ '#f9c8dd', '#b2bddb', '#91c4eb', '#6c84ce', '#d85040', '#c4be84', '#f2c484', '#eacb92' ];
BAR_GRAYS = [ '#888', '#ddd', '#bbb', '#575757', '#eee', '#b9b9b9', '#ccc', '#e5e5e5', '#fff' ];

GRAY_SCHEME = false;

bar_colors = BAR_COLORS;
if( GRAY_SCHEME ){
  bar_colors = BAR_GRAYS
}

COMPANION = {
  HISTOGRAM: {
    DEFAULTS: {
      bins_hint: 20,
      x_axis_title_en: 'X-axis Title',
      y_axis_title_en: 'X-axis Title',
      x_axis_title_nl: 'Titel x-as',
      y_axis_title_nl: 'Titel y-as',
      axis_style: 'font-size:11pt; font-family:PT Sans;',
      scale_style: 'font-size:11pt; font-family:Helvetica Neue;',
      label_y_distance: 75,
      label_x_padding: 10,
      label_y_padding: 4,
      label_stroke: 'rgb(66, 77, 108)',
      connector_stroke: 'rgb(134, 148, 189)',
      label_stroke_width: 1,
      label_fill: 'rgb(219, 228, 255)',
      bar_highlight: '#6c84ce',
      figure_height: 600,
      figure_width: 400,
      plot_margin: { top: 20, right: 20, bottom: 70, left: 80 },
      bar_highlight: '#6c84ce'
    }
  }
}

var opts = COMPANION.HISTOGRAM.DEFAULTS;
opts.plot_width = opts.figure_width - opts.plot_margin.left - opts.plot_margin.right;
opts.plot_height = opts.figure_height - opts.plot_margin.top - opts.plot_margin.bottom;

// Body text black: #1a1919
