var numberOfNodes = 50;
var nodes = [];
var p = 0.2 * 100;
var radius = 5
var edges = [];

function randomNumberBetween0And100() {
  return Math.floor((Math.random() * 100));
}

function randomNumberBetween0And10() {
  return Math.floor((Math.random() * 10));
}

function updateGraph() {
  nodes = [];
  edges = [];
  for (var i  = 0; i < numberOfNodes; i++) {
    nodes.push({color: randomNumberBetween0And100(), id : i});
  }

  for (var i = 0; i < numberOfNodes; i++) {
    for (var j = i + 1; j < numberOfNodes;j++) {
      if (randomNumberBetween0And100() < p) {
        edges.push({source: nodes[i], target: nodes[j], value: Math.sqrt(0.5)});
      }
    }
  }
}
var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

function ticked() {
  link
  .attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; });

  node
  .attr("cx", function(d) { return Math.max(radius, Math.min(width - radius, d.x)); })
  .attr("cy", function(d) { return Math.max(radius, Math.min(height - radius, d.y)); });
}

var simulation = d3.forceSimulation()
.force("link", d3.forceLink().id(function(d) { return 1; }))
.force("center", d3.forceCenter(width / 2, height / 2))
.on("tick", ticked).alphaTarget(1);

node = svg.append("g").attr("class", "nodes").selectAll(".nodes");
link = svg.append("g").attr("class", "links").selectAll(".links");
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

updateGraph();
restart();

$('#nodes').on('input', function() { 
  numberOfNodes = $(this).val();
  updateGraph();
  restart();
});

$('#prob').on('input', function() { 
  p = $(this).val();
  updateGraph();
  restart();
});

$("#refresh").click(function() {
  updateGraph();
  restart();
})

function restart() {
  node = node.data(nodes);

  node.exit().remove();

  node = node.enter().append("circle")
  .attr("r", radius)
  .attr("fill", function(d) { return color(d.color); })
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended))
  .merge(node);

  link = link.data(edges);

  link.exit().remove();

  link = link.enter().append("line")
  .attr("stroke-width", function(d) { return Math.sqrt(d.value); }).merge(link);

  link.exit().remove();
  simulation.nodes(nodes);
  simulation.force("charge", d3.forceManyBody().strength(getChargeStrength()));
  simulation.force("link").links(edges);

  simulation.alpha(1).restart();
  $("#problabel").text("p: " + p + "%")
  $("#nodelabel").text("Number of Nodes: " + numberOfNodes)
  $("#links").text("Number of edges: " + edges.length);
}

function getChargeStrength() {
  if (p == 1) {
    return -5;
  } else if (numberOfNodes < 50) {
    return -5 * p;
  }

  return -5 * p - 1/10 * numberOfNodes;
}

