function burst(){

  var category_nl = {
    'Fiction': 'Literaire roman',
    'Suspense': 'Spanning',
    'Romantic': 'Romantiek',
    'Other': 'Overige'
  }

  function autoBox() {
    document.body.appendChild(this);
    var {x, y, width, height} = this.getBBox();
    document.body.removeChild(this);
    return [x, y, width, height];
  }

  function chart( data ) {
    var root = partition(data);

    var svg = d3.create("svg");

    svg.append("g")
        .attr("fill-opacity", 0.4)
      .selectAll("path")
      .data( root.descendants().filter(d => d.depth) )
      .join("path")
        .attr( "fill", d => { return color( d.data.name ) } )
        // .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("d", arc )
      .append("title")
        // .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
        .text(d => `${d.data.name}\n${numformat(d.value)}`);

    svg.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .join("text")
        .attr( 'style', 'font-size:12pt; font-family:PT Sans;' )
        .attr("transform", function(d) {
          var x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          var y = (d.y0 + d.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "-0.25em")
        .text(d => `${d.data.name}`)
      .select( "g" )
      .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .join("text")
        .attr( 'style', 'font-size:12pt; font-family:PT Sans;' )
        .attr("transform", function(d) {
          var x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          var y = (d.y0 + d.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "1.0em")
        .text(d => `${numformat(d.value)}`);

        // return svg.attr( "viewBox", autoBox ).node();
    return svg.attr( "viewBox", autoBox ).attr( 'width', '650' ).attr( 'height', '650' ).node();
  }

  d3.json( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_3-4b_genre-reading-diversity.json' ).then( function( data ) {

    // color = d3.scaleOrdinal( d3.quantize( d3.interpolateGreys, data.children.length + 2 ) ).domain( data.children )
    // color = d3.scaleOrdinal( d3.quantize( d3.interpolateViridis, data.children.length + 2 ) ).domain( data.children )
    color = d3.scaleOrdinal( d3.quantize( d3.interpolateTurbo, data.children.length + 2 ) ).domain( data.children )
    format = d3.format(",d")
    width = 975
    radius = width / 2

    // I don't like doing this, but there seems no way to transform
    // or influence the result of `d3.hierarchy( data ).sum()` or `.count()`.
    // In this case we want the burst just to use the values in the JSON
    // hierarchy as is. But here seems no way to create a flare
    // hierarchy without `.sum()` or `.count()`, neither of which results
    // in the original values. So I deduct the leaf values from the
    // parent nodes here…
    data.children.forEach( function( category ){
      category.name = category_nl[ category.name ];
      second_category_sum = 0;
      category.children.forEach( function( second_category ){
        second_category.name = category_nl[ second_category.name ];
        second_category_sum += second_category.value;
      });
      category.value -= second_category_sum
    })

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

    var svg_container = d3.select( '#chart_3-4b_genre-reading-diversity' );
    svg_container.node().appendChild( chart( data ) )

  } );

};

// TODO: Abstract sunburst
// In essence a hack to prevent interaction with the relative numbers
// sunburst graph on the same page.
burst();
