class DataPointLabeler{

  constructor( owner ){
    this.owner = owner;
  }

  toggle_data_point_label( d, rect ){
    var bar = d3.select( rect );
    var svg = this.owner.svg;
    // Return the clicked bar to its original color.
    var highlighted_bar = svg.selectAll( 'rect' ).filter( '.highlighted' );
    var label_text = d.value;  // We assume we're working with class Barchart.
    if( typeof d.length != 'undefined' ){
      // But it could also be a Histogram, in which case.
      label_text = d.length;
    }
    if( !highlighted_bar.empty() ) {
      if( typeof highlighted_bar.data()[0].key == 'undefined' ){
        // If this is a Histogram.
        highlighted_bar.style( 'fill', bar_colors[2] );
      } else {
        // It is a Barchart.
        highlighted_bar.style( 'fill', this.owner.color( highlighted_bar.data()[0].key ) );
      }
    }
    var chart_bar_datum_label = svg.select( '.chart_bar_datum_label' )
    if( chart_bar_datum_label ){
      chart_bar_datum_label.remove();
    };
    // We only then toggle the highlight on if a non highlighted bar
    // is clicked.
    if( bar.classed( 'highlighted' ) ){
      bar.classed( 'highlighted', false );
    } else {
      // Remember to put all bars in a non highlighted state.
      svg.selectAll( 'rect' ).classed( 'highlighted', false );
      svg.append( 'g' )
        // Create an id for text so we can select it later for removing
        // on mouseout.
        // We copy the existing transform to force d3 to get us some x and y
        // via the later `getBBox()` and we remove it later again.
        .classed( 'chart_bar_datum_label', true )
        .append( 'text' )
          // Note that this kind of works by accident. Histogram needs the
          // transform, but not x and y, but these will be 0 in that case anyway.
          // Barchart doesn't need the transform, but it will be removed anyway.
          .attr( 'transform', bar.attr( 'transform' ) )
          .attr( 'x', this.owner.x_scale( d.score ) )
          .attr( 'y', this.owner.y_scale( d.value ) )
          .attr( 'style', this.owner.settings.scale_style )
          .text( label_text );
      // Now we need some calculations to determine location
      // of label and the connector to the data point.
      var label_g = svg.select( '.chart_bar_datum_label' )
      var bbox = label_g.node().getBBox();
      // Project left x position of label box on the width
      // of the plot minus the label box width.
      // This guarantees that the label box always falls within the div
      // of the chart horizontally, and thus will be visible.
      var label_box_width = bbox.width + 2*this.owner.settings.label_x_padding;
      var label_box_height = bbox.height + 2*this.owner.settings.label_y_padding;
      var label_box_x = bbox.x * ( ( this.owner.settings.plot_width - label_box_width ) / this.owner.settings.plot_width ) - 8;
      // Compute ending position of connector
      var connector_x_end = 0;
      var connector_y_end = 0;
      var half_bar_width = bar.attr( 'width' )/2;
      if( typeof d.length != 'undefined' ){
        // It's the Histogram, so…
        connector_x_end = this.owner.x_scale( d.x0 ) + half_bar_width;
        connector_y_end = this.owner.y_scale( d.length );
      } else {
        // It's the Barchart, thus…
        var connector_x_end = this.owner.x_scale( d.score ) + this.owner.x_subgroup( d.key ) + half_bar_width;
        console.log( this.owner.x_scale( d.score ) );
        console.log( this.owner.x_scale( 'man' ) );
        connector_y_end = this.owner.y_scale( d.value );
      }
      // Ensure y is chosen so label always falls within the plot area.
      var label_box_y = bbox.y - this.owner.settings.label_y_padding + this.owner.settings.label_y_distance;
      if( connector_y_end > 0.5*this.owner.settings.plot_height ){
        label_box_y = bbox.y - this.owner.settings.label_y_padding - this.owner.settings.label_y_distance;
      }
      var connector_x_start = label_box_x + label_box_width;
      var connector_y_start = label_box_y + 0.5*label_box_height;

      //Now we reposition the label and draw the connector.
      label_text = svg.select( '.chart_bar_datum_label text' );
      label_text.attr( 'transform', null );
      label_text.attr( 'x', label_box_x + this.owner.settings.label_x_padding );
      label_text.attr( 'y', label_box_y + label_box_height - 2*this.owner.settings.label_y_padding );
      label_g.insert( 'rect', ':first-child' )
        .attr( 'x', label_box_x )
        .attr( 'y', label_box_y )
        .attr( 'width', label_box_width )
        .attr( 'height', label_box_height )
        .attr( 'fill', this.owner.settings.label_fill )
        .attr( 'stroke', this.owner.settings.label_stroke )
        .attr( 'stroke-width', this.owner.settings.label_stroke_width );
      var connector_path = d3.path();
      connector_path.moveTo( connector_x_start, connector_y_start );
      var control_y = connector_y_start - ( ( connector_y_start - connector_y_end ) / 2 );
      var control_x = connector_x_start + 50;
      if( control_x > this.owner.settings.plot_width ) { control_x = this.owner.settings.plot_width }
      connector_path.quadraticCurveTo( control_x, control_y, connector_x_end, connector_y_end );
      label_g.append( 'path' )
        .attr( 'd', connector_path )
        .attr( 'stroke-width', 2*this.owner.settings.label_stroke_width )
        .attr( 'stroke', this.owner.settings.connector_stroke )
        .attr( 'fill', 'none' );
      this.draw_connector_endpoint( label_g, connector_x_start, connector_y_start, this.owner );
      this.draw_connector_endpoint( label_g, connector_x_end, connector_y_end, this.owner );
      // And finally hightlight the clicked bar.
      bar.style( 'fill', this.owner.settings.bar_highlight );
      bar.classed( 'highlighted', true );
    }
  }

  // Helper function for the `toggle_data_point_label` function.
  draw_connector_endpoint( g, cx, cy ){
    g.append( 'circle' )
      .attr( 'cx', cx )
      .attr( 'cy', cy )
      .attr( 'r', 3 )
      .attr( 'fill', this.owner.settings.label_fill )
      .attr( 'stroke', this.owner.settings.label_stroke )
      .attr( 'stroke-width', this.owner.settings.label_stroke_width );
  }
}
