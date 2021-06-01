if( typeof( GRAY_SCHEME ) != 'undefined' && GRAY_SCHEME==true ) {
  d3.selectAll( '.chart_float' )
    .classed( 'downloadable', true )
    .append( 'div' )
      .classed( 'download_icon', true )
      .on( 'click', function(){ save_chart( this.parentNode.id ) } )
      .append( 'img' )
        .attr( 'src', 'public/download.svg' )
        .attr( 'alt', 'download button' )
        .attr( 'style', 'width: 30px;' )
}

function save_chart( chart_element_id ) {
  // Get the cart's SVG code and dimensions
  const svg = d3.select( 'div#' + chart_element_id ).select( 'svg' );
  // const svg = d3.select( 'svg' );
  const chart_height = svg.attr( 'height' )
  const chart_width = svg.attr( 'width' )
  const max_render_height = 1180;
  const max_chart_height = 600;
  const render_height = chart_height * ( max_render_height / max_chart_height );
  const render_width = render_height * ( chart_width / chart_height )

  // Create a canvas
  var canvas_modal = document.createElement( 'div' );
  canvas_modal.setAttribute( 'id', 'modal_canvas' );
  canvas_modal.setAttribute( 'style', 'position:absolute;left:0px;top:0px;width:100vw;height:' + render_height + 'px;background-color:white;overflow:hidden;z-index:20;' );
  document.body.appendChild( canvas_modal );

  var close_button = document.createElement( 'img' );
  close_button.setAttribute( 'id', 'close_button' );
  close_button.setAttribute( 'src', '/riddle_d3/public/close.svg' );
  close_button.setAttribute( 'style', 'position:absolute;left:10px;top:10px;width:30px;height:30px;z-index:21;' );
  close_button.setAttribute( 'onclick', "elem=document.querySelector( '#modal_canvas' );document.body.removeChild(elem);" );
  canvas_modal.appendChild( close_button );

  var canvas = document.createElement('canvas');
  canvas.height = render_height;
  canvas.width = render_width;
  canvas_modal.appendChild(canvas);
  const img = new Image;
  svg_str = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="' +
            chart_width + '" height="' + chart_height +
            '" style="background-color: white;">' + svg.html() + '</svg>';

  const blob = new Blob([svg_str], { type: 'image/svg+xml;charset=utf-8' })
  const URLSrc = URL.createObjectURL(blob);

  img.onload = function () {
    canvas.getContext('2d').drawImage( this, 0, 0, render_width, render_height);
  }

 img.src = URLSrc;
 img.setAttribute( 'style', 'height:80vh;' )
}
