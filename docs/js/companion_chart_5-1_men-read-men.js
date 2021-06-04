d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_5-1_men-read-men.csv' ).then( function( data ) {

  const xAxisTitle = 'Score';
  const yAxisTitle = 'Number of respondents';
  const xAxisTitle_nl = 'Score';
  const yAxisTitle_nl = 'Aantal respondenten';

  const axisStyle = 'font-size:11pt; font-family:PT Sans;'
  const scaleStyle = 'font-size:11pt; font-family:Helvetica Neue;'

  // data.forEach( function( d ) {
  //   d.resp_id = +d['respondent.id'];
  //   d.book_per_year = +d['books.per.year'];
  // });

  const figure_height = 400;
  const figure_width = 480;

  // Define the dimensions and margins of the graph
  // const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  // Not sure yet if setting larger margins is best for axis labels plotting
  const plot_margin = { top: 20, right: 200, bottom: 120, left: 110 },
      plot_width = figure_width - plot_margin.left - plot_margin.right,
      plot_height = figure_height - plot_margin.top - plot_margin.bottom;

  // Append the svg object to the appropriate div.
  const svg = d3.select( 'div#chart_5-1_men-read-men' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = data.columns.slice(2)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups_nl = { 'author_man': 'man',
                      'author_woman': 'vrouw' }
  const groups = d3.map( data, function(d){ return( groups_nl[d.group] ) } )

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, plot_width])
      .padding([0.2])
  svg.append("g")
    .attr( "transform", "translate(0," + plot_height + ")" )
    .call( d3.axisBottom( x ).tickSize( 5 ) )
    .attr( 'style', scaleStyle );
  svg.append( 'g' ).append( 'text' )
    .attr( 'x', 63 ).attr( 'y', 300 )
    .text( 'auteur' )
    .attr( 'style', scaleStyle );

    //  This was a solution to rotate the labels, but it wasn't what client wanted.
    // .selectAll("text")
    //   .attr( "text-anchor", 'start' )
    //   .attr("transform", "rotate(65)")
    //   .attr( 'dx', '15px' )
    //   .attr( 'dy', '-0px' );

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 200000])
    .range([ plot_height, 0 ]);
  svg.append("g")
    .call( d3.axisLeft( y ).ticks( 5 ).tickFormat( x => numformat( x ) ) )
    .attr( 'id', 'yaxis' )
    .attr( 'style', scaleStyle );

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.09])

  const color = d3.scaleOrdinal()
    .range( bar_colors )

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(groups_nl[d.group]) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth() )
      .attr("height", function(d) { return plot_height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });


  // Render y axis label
  // Compute the space left between axis ticks and edge of figure.
  const gutter_width = plot_margin.left - d3.select('#yaxis').node().getBBox().width
  // Calculate center of gutter
  const yAxisLabelX = -plot_margin.left + ( gutter_width / 2 )
  // Calculate center of y axis
  const yAxisLabelY = plot_margin.top + plot_height / 2;
  // Put y axis label center on calculated spot
  svg.append( 'g' )
      .attr( 'transform', 'translate(' + yAxisLabelX + ', ' + yAxisLabelY + ')' )
      .append( 'text' )
        .attr( 'text-anchor', 'middle' )
        .attr( 'transform', 'rotate(-90)' )
        .attr( 'style', axisStyle )
        .text( yAxisTitle_nl );


  // Let's try a legend

  // Add one dot in the legend for each name.
  var keys = [ 'men_readers', 'women_readers' ]
  var keys_nl = { 'men_readers': 'Lezer is man',
                  'women_readers': 'Lezer is vrouw' }

  var size = 17
  svg.selectAll( 'legend_key' )
    .data( keys )
    .enter()
    .append( 'rect' )
      .attr( 'x', 230 )
      .attr( 'y', function(d,i){ return 100 + i*( size+10 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
      .attr( 'width', size )
      .attr( 'height', size )
      .style( 'fill', function(d){ return color( d ) } )

  // Add one dot in the legend for each name.
  svg.selectAll( 'legend_key_labels' )
    .data( keys )
    .enter()
    .append( 'text' )
      .attr( 'x', 235 + size*1.2 )
      .attr( 'y', function(d,i){ return 105 + i*( size+10 ) + ( size/2 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
      .attr( 'style', axisStyle )
      .text( function(d){ return keys_nl[ d ] } )
      .attr( 'text-anchor', 'left' )
      .style( 'alignment-baseline', 'middle' )

});
