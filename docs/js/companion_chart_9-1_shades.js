d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_9-1_shades.csv' ).then( function( data ) {

  const xAxisTitle = 'Number of books read annually';
  const yAxisTitle = 'Number of respondents';

  // data.forEach( function( d ) {
  //   d.resp_id = +d['respondent.id'];
  //   d.book_per_year = +d['books.per.year'];
  // });

  const figure_height = 400;
  const figure_width = 500;

  // Define the dimensions and margins of the graph
  // const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  // Not sure yet if setting larger margins is best for axis labels plotting
  const plot_margin = { top: 20, right: 20, bottom: 70, left: 80 },
      plot_width = figure_width - plot_margin.left - plot_margin.right,
      plot_height = figure_height - plot_margin.top - plot_margin.bottom;

  // Append the svg object to the appropriate div.
  const svg = d3.select( 'div#chart_9-1_shades' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = data.columns.slice(2)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = d3.map(data, function(d){return(d.score)})

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, plot_width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + plot_height + ")")
    .call(d3.axisBottom(x).tickSize(5));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 160])
    .range([ plot_height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

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
      .attr("transform", function(d) { return "translate(" + x(d.score) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth() )
      .attr("height", function(d) { return plot_height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

});
