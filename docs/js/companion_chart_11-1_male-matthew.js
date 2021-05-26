d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_11-1_male-matthew.csv' ).then( function( data ) {

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
  const svg = d3.select( 'div#chart_11-1_male-matthew' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = data.columns.slice(2,4)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = d3.map(data, function(d){return(d.rank)})

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
    .domain([0, 7])
    .range([ plot_height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.09])

  const color = d3.scaleOrdinal()
    .range( [ '#77b5bf', '#f2c484', '#f9c8dd', '#b2bddb', '#6c84ce', '#d85040', '#c4be84', '#eacb92' ] )

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.rank) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth() )
      .attr("height", function(d) { return plot_height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

});



// An alternative representation with all data involved

d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_11-2_male-matthew-all.csv' ).then( function( data ) {

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
  const svg = d3.select( 'div#chart_11-2_male-matthew-all' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 75])
    .range([ 0, plot_width ]);
  svg.append("g")
    .attr("transform", "translate(0," + plot_height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([2, 7])
    .range([ plot_height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll( "dot" )
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.rank); } )
      .attr("cy", function (d) { return y(d.male_authors); } )
      .attr("r", 2.5)
      .style("fill", "#77b5bf")

  svg.append('g')
    .selectAll( "dot" )
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.rank); } )
      .attr("cy", function (d) { return y(d.female_authors); } )
      .attr("r", 2.5)
      .style("fill", "#f2c484")
});
