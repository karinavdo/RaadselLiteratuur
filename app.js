d3.csv( "https://raw.githubusercontent.com/jorisvanzundert/riddle_shiny/main/csv/age_read_mean.csv" ).then( function( data ) {
  data.forEach( function( d ) {
    d.age_group = d.age_group;
    d.mean = +d.mean;
  });

  var margin = ({top: 30, right: 0, bottom: 10, left: 60})

  var container = d3.select( 'svg#age_read_mean' )
    .classed( 'container', true )

  var xScale = d3
    .scaleLinear().domain([0,100]).range([ margin.left, 400]);
  var yScale = d3
    .scaleBand()
    .domain( data.map( (dataPoint) => dataPoint.age_group ) )
    .rangeRound([0,300-margin.top])
    .padding(0.2);

  var bars = container
    .selectAll( '.bar' )
    .data( data )
    .enter()
    .append( 'rect' )
    .classed( 'bar', true )
    .attr( 'width', (data) => xScale( data.mean ) - margin.left )
    .attr( 'height', yScale.bandwidth() )
    .attr( 'x', data => margin.left )
    .attr( 'y', data => yScale( data.age_group ) + margin.top )
    .on( 'click', function(){ console.log( 'Until it goes "click".' ) } );

  var format = xScale.tickFormat(20, data.format)

  container.append("g")
          .attr("fill", "white")
          .attr("text-anchor", "end")
          .attr("font-family", "sans-serif")
          .attr("font-size", 12)
        .selectAll("text")
        .data(data)
        .join("text")
          .attr("x", d => xScale( d.mean ) )
          .attr("y", d => yScale( d.age_group ) + margin.top + yScale.bandwidth() / 2)
          .attr("dy", "0.35em")
          .attr("dx", -4 )
          .text(d => d.mean.toFixed(2) )
        .call(text => text.filter(d => xScale(d.mean) - xScale(0) < 20) // short bars
          .attr("dx", +4)
          .attr("fill", "black")
          .attr("text-anchor", "start"));

  container.append( "g" )
      .attr("transform", `translate( ${margin.left} , ${margin.top})`)
      .call( d3.axisLeft(yScale).tickFormat( data.age_group ).tickSizeOuter(0) )

  container.append( "g" )
      .attr("transform", `translate(0,${margin.top})`)
      .call( d3.axisTop( xScale ).ticks( 400/100, "s" ) )
      .call(g => g.select(".domain").remove())

});

d3.csv( "https://raw.githubusercontent.com/jorisvanzundert/riddle_shiny/main/csv/age_read.csv" ).then( function( data ) {
  data.forEach( function( d ) {
    d.age_resp = +d['age.resp'];
    d.books_per_year = +d['books.per.year'];
  });

  var group_data = function() {
    s = ( Math.floor( Math.random() * 8 ) + 1 ) * 10
    return data.filter( function(d){ return ( +d['age.resp'] > s & +d['age.resp'] < s+10 ) } )
  }

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 40},
      width = 260 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("div#age_read_hist")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  render_hist = function() {

    // X axis: scale and draw:
    var x = d3.scaleLinear()
        .domain([0, 200])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.books_per_year; } )   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(20)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram( group_data() );

    svg.select( '#yaxis' ).remove();

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    svg.append( "g" )
        .call( d3.axisLeft(y) )
        .attr( 'id', 'yaxis' );

    svg.selectAll( 'rect' ).remove();

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#69b3a2")
          .on( 'click', render_hist );

  }

  render_hist();
});
