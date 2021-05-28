d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_N1_sentence-length.csv' ).then( function( data ) {

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
  const svg = d3.select( 'div#chart_N1_sentence-length' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // Add X axis
  const x = d3.scaleLinear()
    .domain([7, 20])
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
      .attr("cx", function (d) { return x(d.avg_sentence_length); } )
      .attr("cy", function (d) { return y(d.literariness_read); } )
      .attr("r", 2.5)
      .style("fill", "#77b5bf")

  linearRegression = ss.linearRegression( data.map( d => [ +d.avg_sentence_length, +d.literariness_read ] ) )
  linearRegressionLine = ss.linearRegressionLine( linearRegression )
  regressionPoints = function() {
    const firstX = d3.min(data, d => +d.avg_sentence_length);
    const lastX = d3.max(data, d => +d.avg_sentence_length);
    const xCoordinates = [firstX, lastX];
    return xCoordinates.map(d => ({
      x: d,                         // We pick x and y arbitrarily, just make sure they match d3.line accessors
      y: linearRegressionLine(d)
    }));
  }
  line = d3.line()
         .x(d => x(d.x))
         .y(d => y(d.y))
  svg.append('path')
     .classed('regressionLine', true)
     .datum(regressionPoints)
     .attr('d', line);


});


d3.csv( '/riddle_d3/public/chart_N1_sentence-length.csv' ).then( function( data ) {
  // d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_N1_sentence-length.csv' ).then( function( data ) {

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
  const svg = d3.select( 'div#chart_N1_sentence-length-variance' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // Add X axis
  const x = d3.scaleLinear()
    .domain([4, 18])
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
      .attr("cx", function (d) { return x(d.sentence_length_variance); } )
      .attr("cy", function (d) { return y(d.literariness_read); } )
      .attr("r", 2.5)
      .style("fill", "#77b5bf")

  linearRegression = ss.linearRegression( data.map( d => [ +d.sentence_length_variance, +d.literariness_read ] ) )
  linearRegressionLine = ss.linearRegressionLine( linearRegression )
  regressionPoints = function() {
    const firstX = d3.min(data, d => +d.sentence_length_variance);
    const lastX = d3.max(data, d => +d.sentence_length_variance);
    const xCoordinates = [firstX, lastX];
    return xCoordinates.map(d => ({
      x: d,                         // We pick x and y arbitrarily, just make sure they match d3.line accessors
      y: linearRegressionLine(d)
    }));
  }
  line = d3.line()
         .x(d => x(d.x))
         .y(d => y(d.y))
  svg.append('path')
     .classed('regressionLine', true)
     .datum(regressionPoints)
     .attr('d', line);

});
