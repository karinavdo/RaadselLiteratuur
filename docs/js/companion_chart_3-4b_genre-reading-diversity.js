function autoBox() {
  document.body.appendChild(this);
  const {x, y, width, height} = this.getBBox();
  document.body.removeChild(this);
  return [x, y, width, height];
}

function chart( data ) {
  const root = partition(data);
  console.log( root )
  const svg = d3.create("svg");

  svg.append("g")
      .attr("fill-opacity", 0.4)
    .selectAll("path")
    .data( root.descendants().filter(d => d.depth) )
    .join("path")
      .attr( "fill", d => { console.log( d.data.name ); return color( d.data.name ) } )
      // .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("d", arc )
    .append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 16)
      .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    .join("text")
      .attr( 'style', 'font-size:11pt; font-family:PT Sans;' )
      .attr("transform", function(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => d.data.name);

      // return svg.attr( "viewBox", autoBox ).node();
  return svg.attr( "viewBox", autoBox ).attr( 'width', '550' ).attr( 'height', '550' ).node();
}

d3.json( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-4b_genre-reading-diversity.json' ).then( function( data ) {

  // color = d3.scaleOrdinal( d3.quantize( d3.interpolateGreys, data.children.length + 2 ) ).domain( data.children )
  // color = d3.scaleOrdinal( d3.quantize( d3.interpolateViridis, data.children.length + 2 ) ).domain( data.children )
  color = d3.scaleOrdinal( d3.quantize( d3.interpolateTurbo, data.children.length + 2 ) ).domain( data.children )
  format = d3.format(",d")
  width = 975
  radius = width / 2

  partition = function( data ){
    layout = d3.partition().size( [2 * Math.PI, radius] )
    return layout( d3.hierarchy( data )
                     .sum(d => d.value)
                     .sort((a, b) => b.value - a.value) )
  }

  arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)

  const svg_container = d3.select( '#chart_3-4b_genre-reading-diversity' );
  svg_container.node().appendChild( chart( data ) )

} );
