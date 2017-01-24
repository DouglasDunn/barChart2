var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
var w = 800;
var h = 450;

var margin = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20
}

var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("id", "chart")
  .attr("width", w)
  .attr("height", h)

var g = svg.append("g")
  .classed("display", true)
  .attr("width", width)
  .attr("height", height)
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

$.getJSON(url, function(res) {
  var GDPArray = res.data;
  var GDPData = GDPArray.map(data => data[1]);

  var x = d3.scaleLinear()
    .domain([0, d3.max(GDPData)])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, GDPData.length])
    .range([0, height]);

  var bar = g.selectAll(".bar")
    .data(GDPData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", 0)
    .attr("y", function(d, i) {
      return y(i);
    })
    .attr("width", function(d, i) {
      return x(d);
    })
    .attr("height", function(d, i) {
      return y(1);
    });
});
