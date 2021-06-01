const svg_to_canvas_button = document.createElement( 'div' )
svg_to_canvas_button.setAttribute( 'id', 'svg_to_canvas_button' )
svg_to_canvas_button.setAttribute( 'onClick', 'save_chart();' )
svg_to_canvas_button.innerHTML= 'download';
svg_to_canvas_button.setAttribute( 'style', 'position:absolute;left:100px;top:500px;width:150px;height:2em;text-align:center;border:1px solid black;background-color:#ddd;box-shadow: 6px 4px 9px 0px #999;' )
document.body.appendChild( svg_to_canvas_button );

function save_chart() {

  // Get the cart's SVG code and dimensions
  const svg = d3.select( 'div#chart_3-1_books-per-year_excerpt' ).select( 'svg' );
  const chart_height = svg.attr( 'height' )
  const chart_width = svg.attr( 'width' )
  const render_height = 1180;
  const render_width = render_height * ( chart_width / chart_height )

  // Create a canvas
  var canvas = document.createElement('canvas');
  canvas.height = render_height;
  canvas.width = render_width;
  document.body.appendChild(canvas);
  const img = new Image;

  svg_str = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="' +
            chart_width + '" height="' + chart_height +
            '" style="background-color: white;">' + svg.html() + '</svg>';

  const blob = new Blob([svg_str], { type: 'image/svg+xml;charset=utf-8' })
  const URLSrc = URL.createObjectURL(blob);

  img.onload = function () {
    canvas.getContext('2d').drawImage( this, 0, 0, render_width, render_height);
    console.log('Image Loaded');
  }

 img.src = URLSrc;
}
