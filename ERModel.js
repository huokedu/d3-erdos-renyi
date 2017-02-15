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

function getChargeStrength() {
  if (p == 1) {
    return -5;
  } else if (numberOfNodes < 50) {
    return -5 * p;
  }

  return -5 * p - 1/10 * numberOfNodes;
}

initialize(updateGraph, getChargeStrength);

