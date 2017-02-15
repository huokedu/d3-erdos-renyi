function randomNode() {
  return Math.floor((Math.random() * numberOfNodes));
}

function updateGraph() {
  nodes = [];
  edges = [];
  for (var i  = 0; i < numberOfNodes; i++) {
    nodes.push({color: randomNumberBetween0And100(), id : i});
  }
  for (var i = 0; i < numberOfNodes; i++) {
    edges.push({source: nodes[i], target: nodes[(i + 1) % numberOfNodes], value: Math.sqrt(0.5)});
    edges.push({source: nodes[i], target: nodes[(i + 2) % numberOfNodes], value: Math.sqrt(0.5)});
  }
  for (var i = 0; i < edges.length; i++) {
    if (randomNumberBetween0And100() < p) {
      edges[i].target = nodes[randomNode()];
    }
  }
}

function getChargeStrength() {
  if (numberOfNodes < 50) {
    return -5 * p;
  }

  return -5;
}

initialize(updateGraph, getChargeStrength);
