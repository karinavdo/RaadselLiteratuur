d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_11-4_sentence-length.csv' ).then( function( data ) {

  const xAxisTitle = 'Number of books read annually';
  const yAxisTitle = 'Number of respondents';
  const xAxisTitle_nl = 'Gemiddelde zinslengte (aantal woorden)';
  const yAxisTitle_nl = 'Gemiddelde score voor literaire kwaliteit';

  const axisStyle = 'font-size:11pt; font-family:PT Sans;'
  const scaleStyle = 'font-size:11pt; font-family:Helvetica Neue;'

  // data.forEach( function( d ) {
  //   d.resp_id = +d['respondent.id'];
  //   d.book_per_year = +d['books.per.year'];
  // });

  const figure_height = 400;
  const figure_width = 680;

  // Define the dimensions and margins of the graph
  // const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  // Not sure yet if setting larger margins is best for axis labels plotting
  const plot_margin = { top: 20, right: 200, bottom: 70, left: 80 },
      plot_width = figure_width - plot_margin.left - plot_margin.right,
      plot_height = figure_height - plot_margin.top - plot_margin.bottom;

  // Append the svg object to the appropriate div.
  const svg = d3.select( 'div#chart_11-4_sentence-length' )
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
    .call( d3.axisBottom( x ) )
    .attr( 'style', scaleStyle );

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([2, 7])
    .range([ plot_height, 0]);
  svg.append("g")
    .call( d3.axisLeft( y ).ticks( 5 ) )
    .attr( 'id', 'yaxis' )
    .attr( 'style', scaleStyle );

  // Add dots
  const symbol_map = { 'male': [ d3.symbol().type(d3.symbolSquare).size(30), 0 ],
                       'female': [ d3.symbol().type(d3.symbolCircle).size(30), 1]  }
  svg.append('g')
    .selectAll( "dot" )
    .data(data)
    .enter()
    .append("path")
      .attr( "d", function(d){ return symbol_map[ d.gender ][0]() } )
      .style( 'fill', function(d){ return bar_colors[ symbol_map[ d.gender ][1] ] } )
      .style( 'stroke', bar_colors[3] )
      .style( 'stroke-width', '1px' )
      .attr( "transform", function (d) {
                              trf = 'translate(' + x(d.avg_sentence_length) +
                              ',' + y(d.literariness_read) + ')';
                              return trf } )

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
         line_style = 'stroke:' + bar_colors[3] + ';fill:none;stroke-width:1.5;stroke-dasharray: 3,5;'
  svg.append('path')
    .attr( 'style', line_style )
    .datum(regressionPoints)
    .attr('d', line);

  // Same thing but now for x axis
  // const gutter_height = plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
  const gutter_height = 30;
  const xAxisLabelY = figure_height - ( plot_margin.bottom / 2 );
  const xAxisLabelX = plot_width / 2;
  svg.append( 'g' )
     .attr( 'transform', 'translate(' + xAxisLabelX + ', ' + xAxisLabelY + ')' )
     .append( 'text' )
       .attr( 'text-anchor', 'middle' )
       .attr( 'style', axisStyle ) // Was font-size: 80% which is smaller but looks way smarter!
       .text( xAxisTitle_nl );

  // Render x and y axes labels
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
  var keys = [ 'male', 'female' ]
  var keys_nl = { 'male': 'auteur is man',
                'female': 'auteur is vrouw' }

  var size = 30
  svg.selectAll( 'legend_key' )
  .data( keys )
  .enter()
  .append("path")
    .attr( "d", function(d){ return symbol_map[ d ][0]() } )
    .style( 'fill', function(d){ return bar_colors[ symbol_map[ d ][1] ] } )
    .style( 'stroke', bar_colors[3] )
    .style( 'stroke-width', '1px' )
    .attr( 'transform', function (d,i) {
                            trf = 'translate(' + 480 +
                            ',' + (100 + i*( size-3 )) + ')';
                            return trf } )
  // Add one dot in the legend for each name.
  svg.selectAll( 'legend_key_labels' )
  .data( keys )
  .enter()
  .append( 'text' )
    .attr( 'x', 460 + size*1.2 )
    .attr( 'y', function(d,i){ return 90 + i*( size-3 ) + ( size/2 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
    .attr( 'style', axisStyle )
    .text( function(d){ return keys_nl[ d ] } )
    .attr( 'text-anchor', 'left' )
    .style( 'alignment-baseline', 'middle' )

});


d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_11-4_sentence-length.csv' ).then( function( data ) {

  const xAxisTitle = 'Number of books read annually';
  const yAxisTitle = 'Number of respondents';
  const xAxisTitle_nl = 'Gemiddelde variatie in zinslengte (in aantal woorden)';
  const yAxisTitle_nl = 'Gemiddelde score voor literaire kwaliteit';

  const axisStyle = 'font-size:11pt; font-family:PT Sans;'
  const scaleStyle = 'font-size:11pt; font-family:Helvetica Neue;'

  // data.forEach( function( d ) {
  //   d.resp_id = +d['respondent.id'];
  //   d.book_per_year = +d['books.per.year'];
  // });

  const figure_height = 400;
  const figure_width = 680;

  // Define the dimensions and margins of the graph
  // const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  // Not sure yet if setting larger margins is best for axis labels plotting
  const plot_margin = { top: 20, right: 200, bottom: 70, left: 80 },
      plot_width = figure_width - plot_margin.left - plot_margin.right,
      plot_height = figure_height - plot_margin.top - plot_margin.bottom;

  // Append the svg object to the appropriate div.
  const svg = d3.select( 'div#chart_11-5_sentence-length-variance' )
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
    .call( d3.axisBottom( x ) )
    .attr( 'style', scaleStyle );

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([2, 7])
    .range([ plot_height, 0]);
  svg.append("g")
    .call( d3.axisLeft( y ).ticks( 5 ) )
    .attr( 'id', 'yaxis' )
    .attr( 'style', scaleStyle );

  // Add dots
  const symbol_map = { 'male': [ d3.symbol().type(d3.symbolSquare).size(30), 0 ],
                       'female': [ d3.symbol().type(d3.symbolCircle).size(30), 1 ] }
  svg.append('g')
    .selectAll( "dot" )
    .data(data)
    .enter()
    .append("path")
      .attr( "d", function(d){ return symbol_map[ d.gender ][0]() } )
      .style( 'fill', function(d){ return bar_colors[ symbol_map[ d.gender ][1] ] } )
      .style( 'stroke', bar_colors[3] )
      .style( 'stroke-width', '1px' )
      .attr( "transform", function (d) {
                              trf = 'translate(' + x(d.sentence_length_variance) +
                              ',' + y(d.literariness_read) + ')';
                              return trf } )

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
  line_style = 'stroke:' + bar_colors[3] + ';fill:none;stroke-width:1.5;stroke-dasharray: 3,5;'
  svg.append('path')
     .attr( 'style', line_style )
     .datum(regressionPoints)
     .attr('d', line);

  // Same thing but now for x axis
  // const gutter_height = plot_margin.bottom - d3.select('#xaxis').node().getBBox().height
  const gutter_height = 30;
  const xAxisLabelY = figure_height - ( plot_margin.bottom / 2 );
  const xAxisLabelX = plot_width / 2;
  svg.append( 'g' )
    .attr( 'transform', 'translate(' + xAxisLabelX + ', ' + xAxisLabelY + ')' )
    .append( 'text' )
      .attr( 'text-anchor', 'middle' )
      .attr( 'style', axisStyle ) // Was font-size: 80% which is smaller but looks way smarter!
      .text( xAxisTitle_nl );

  // Render x and y axes labels
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
  var keys = [ 'male', 'female' ]
  var keys_nl = { 'male': 'auteur is man',
                'female': 'auteur is vrouw' }

  var size = 30
  svg.selectAll( 'legend_key' )
  .data( keys )
  .enter()
  .append("path")
    .attr( "d", function(d){ return symbol_map[ d ][0]() } )
    .style( 'fill', function(d){ return bar_colors[ symbol_map[ d ][1] ] } )
    .style( 'stroke', bar_colors[3] )
    .style( 'stroke-width', '1px' )
    .attr( 'transform', function (d,i) {
                            trf = 'translate(' + 480 +
                            ',' + (100 + i*( size-3 )) + ')';
                            return trf } )
  // Add one dot in the legend for each name.
  svg.selectAll( 'legend_key_labels' )
  .data( keys )
  .enter()
  .append( 'text' )
    .attr( 'x', 460 + size*1.2 )
    .attr( 'y', function(d,i){ return 90 + i*( size-3 ) + ( size/2 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
    .attr( 'style', axisStyle )
    .text( function(d){ return keys_nl[ d ] } )
    .attr( 'text-anchor', 'left' )
    .style( 'alignment-baseline', 'middle' )

});
