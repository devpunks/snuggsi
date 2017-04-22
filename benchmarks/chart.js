// Set the dimensions of the canvas / graph
var margin = { top: 30, right: 20, bottom: 30, left: 50 }
  , width  = 1200 // - margin.left - margin.right
  , height = 70 // - margin.top - margin.bottom

var x = d3.time.scale().range([0, width])
  , y = d3.scale.linear().range([height, 0])

  , xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10)

  , yAxis = d3.svg.axis().scale(y).orient("left").ticks(10)

  , line = d3.svg.line()
      .x(function(d) { console.log(d.index); return x(d.index); })
      .y(function(d) { console.log(d.milliseconds); return y(d.milliseconds); })

// Adds the svg canvas
var svg = d3.select("div#chart")
  .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
  .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

var index = 0
var format = function(row) {
console.log ('row', row)
  return {
    index: index++,
    milliseconds: row.time
  }
}

var plot = function(error, rows) {
  x.domain(d3.extent(rows, function(d) { return d.index; }))
  y.domain([0, d3.max(rows, function(d) { return d.milliseconds; })])

  var path = svg.append("path");
    path
      .attr("class", "line")
      .attr("d", line(rows));

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
}

d3.csv("data.csv", format, plot)
