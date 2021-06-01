const container_colors = d3.select( 'div#color_example_box' )
const container_grays = d3.select( 'div#gray_example_box' )

style_boiler_plate = 'width:80px; height:80px; border:1px solid black;margin-bottom:10px;margin-right:20px;background-color:';

container_colors.selectAll( 'div' )
    .data( [ { 'color': '#f9c8dd' },
             { 'color': '#b2bddb' },
             { 'color': '#6c84ce' },
             { 'color': '#77b5bf' },
             { 'color': '#d85040' },
             { 'color': '#c4be84' },
             { 'color': '#f2c484' },
             { 'color': '#eacb92' } ] )
    .enter()
    .append( 'div' )
      .attr( 'style', function(d){ return style_boiler_plate + d.color + ';'; } );

container_grays.selectAll( 'div' )
    .data( [ { 'color': '#888' },
             { 'color': '#bbb' },
             { 'color': '#ddd' },
             { 'color': '#575757' },
             { 'color': '#eee' },
             { 'color': '#b9b9b9' },
             { 'color': '#ccc' },
             { 'color': '#e5e5e5' } ] )
    .enter()
    .append( 'div' )
      .attr( 'style', function(d){ return style_boiler_plate + d.color + ';'; } );
