d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_11-1_male-matthew.csv' ).then( function( data ) {

  const xAxisTitle_en = 'Rank in Top 10 per gender';
  const yAxisTitle_en = 'Mean score for literary quality';
  const xAxisTitle_nl = 'Plaats in de Top 10 per geslacht';
  const yAxisTitle_nl = 'Gemiddelde score voor literaire kwaliteit';

  const xAxisTitle = eval( 'xAxisTitle_' + LANG );
  const yAxisTitle = eval( 'yAxisTitle_' + LANG );

  const axisStyle = 'font-size:11pt; font-family:PT Sans;'
  const scaleStyle = 'font-size:11pt; font-family:PT Sans;'

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
    .call( d3.axisBottom( x ).tickSize( 5 ) )
    .attr( 'style', scaleStyle );

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 7])
    .range([ plot_height, 0 ]);
  svg.append("g")
    .call( d3.axisLeft( y ).ticks( 5 ) )
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
      .attr("transform", function(d) { return "translate(" + x(d.rank) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth() )
      .attr("height", function(d) { return plot_height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

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
        .text( xAxisTitle );

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
        .text( yAxisTitle );


  // Let's try a legend

  // Add one dot in the legend for each name.
  var keys = [ 'score_m', 'score_f' ]
  var keys_locale = { 'score_m':
                      {
                        'en': 'Author is male',
                        'nl': 'Auteur is man'
                      },
                      'score_f':
                      {
                        'en': 'Author is female',
                        'nl': 'Auteur is vrouw'
                      }
                    }
  var size = 17
  svg.selectAll( 'legend_key' )
    .data( keys )
    .enter()
    .append( 'rect' )
      .attr( 'x', 430 )
      .attr( 'y', function(d,i){ return 100 + i*( size+10 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
      .attr( 'width', size )
      .attr( 'height', size )
      .style( 'fill', function(d){ return color( d ) } )

  // Add one dot in the legend for each name.
  svg.selectAll( 'legend_key_labels' )
    .data( keys )
    .enter()
    .append( 'text' )
      .attr( 'x', 435 + size*1.2 )
      .attr( 'y', function(d,i){ return 105 + i*( size+10 ) + ( size/2 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
      .attr( 'style', axisStyle )
      .text( function(d){ return keys_locale[ d ][ LANG ] } )
      .attr( 'text-anchor', 'left' )
      .style( 'alignment-baseline', 'middle' )

});



// An alternative representation with all data involved

d3.csv( 'https://raw.githubusercontent.com/jorisvanzundert/riddle_d3/main/csv/chart_11-2_male-matthew-all.csv' ).then( function( data ) {

  const xAxisTitle_en = 'Rank in Top 10 per gender';
  const yAxisTitle_en = 'Mean score for literary quality';
  const xAxisTitle_nl = 'Plaats in de Top 10 per geslacht';
  const yAxisTitle_nl = 'Gemiddelde score voor literaire kwaliteit';

  const xAxisTitle = eval( 'xAxisTitle_' + LANG );
  const yAxisTitle = eval( 'yAxisTitle_' + LANG );

  const axisStyle = 'font-size:11pt; font-family:PT Sans;'
  const scaleStyle = 'font-size:11pt; font-family:PT Sans;'

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
  const svg = d3.select( 'div#chart_11-2_male-matthew-all' )
    .append( 'svg' )
      .attr( 'width', plot_width + plot_margin.left + plot_margin.right )
      .attr( 'height', plot_height + plot_margin.top + plot_margin.bottom )
      .append( 'g' )
        .attr( 'transform', 'translate( ' + plot_margin.left + ', ' + plot_margin.top + ' )' );

  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 50])
    .range([ 0, plot_width ]);
  svg.append("g")
    .attr("transform", "translate(0," + plot_height + ")")
    .call( d3.axisBottom( x ).tickSize( 5 ) )
    .attr( 'style', scaleStyle );

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([3, 7])
    .range([ plot_height, 0]);
  svg.append("g")
    .call( d3.axisLeft(y).ticks( 5 ) )
    .attr( 'id', 'yaxis' )
    .attr( 'style', scaleStyle );

  const color = d3.scaleOrdinal()
    .range( bar_colors )

  // Add dots
  svg.append('g')
    .selectAll( "dot" )
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.rank); } )
      .attr("cy", function (d) { return y(d.male_authors); } )
      .attr("r", 2.5)
      .style("fill", bar_colors[0] )

  svg.append('g')
    .selectAll( "dot" )
    .data(data)
    .enter()
    .append("circle")
    .filter( function(d){ return d.female_authors != 'NA' } )
      .attr("cx", function (d) { return x(d.rank); } )
      .attr("cy", function (d) { return y(d.female_authors); } )
      .attr("r", 2.5)
      .style("fill", bar_colors[1] )

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
        .text( xAxisTitle );

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
        .text( yAxisTitle );


  // Let's try a legend

  // Add one dot in the legend for each name.
  var keys = [ 'male_authors', 'female_authors' ];
  var keys_locale = { 'male_authors':
                      {
                        'en': 'Author is male',
                        'nl': 'Auteur is man'
                      },
                      'female_authors':
                      {
                        'en': 'Author is female',
                        'nl': 'Auteur is vrouw'
                      }
                    }
  var size = 17
  svg.selectAll( 'legend_key' )
    .data( keys )
    .enter()
    .append( 'rect' )
      .attr( 'x', 430 )
      .attr( 'y', function(d,i){ return 100 + i*( size+10 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
      .attr( 'width', size )
      .attr( 'height', size )
      .style( 'fill', function(d){ return color( d ) } )

  // Add one dot in the legend for each name.
  svg.selectAll( 'legend_key_labels' )
    .data( keys )
    .enter()
    .append( 'text' )
      .attr( 'x', 435 + size*1.2 )
      .attr( 'y', function(d,i){ return 105 + i*( size+10 ) + ( size/2 ) } ) // 100 is where the first dot appears. 25 is the distance between dots
      .attr( 'style', axisStyle )
      .text( function(d){ return keys_locale[ d ][ LANG ] } )
      .attr( 'text-anchor', 'left' )
      .style( 'alignment-baseline', 'middle' )

});
