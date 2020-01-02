import getUnvisitedNeighbors from "../helpers/getUnvisitedNeighbors";

export default function Astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const openList = [startNode];
  const distanceF = [];
  startNode.distance = 0;
  startNode.h = 0;
  grid.map(row => {
    row.map(node => {
      node.h = manhattanDistance(node, finishNode);
      distanceF.push([node.h]);
    });
  });

  while (openList.length !== 0) {
    let currentNode = openList.shift();
    visitedNodesInOrder.push(currentNode);
    currentNode.isVisited = true;
    let currentNeighbors = getUnvisitedNeighbors(currentNode, grid);

    let q = findLowerF(currentNode, currentNeighbors);
    if (q === null) {
      return visitedNodesInOrder;
    } else if (q.h === 0) {
      return visitedNodesInOrder;
    } else {
      openList.push(q);
    }
  }
}
const manhattanDistance = (node, finishNode) => {
  let distance = 9999;
  if (node.isWeight) {
    distance =
      30 +
      Math.abs(node.row - finishNode.row) +
      Math.abs(node.col - finishNode.col);
  } else if (node.isWall) {
    distance = Infinity;
  } else {
    distance =
      Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
  }
  return distance;
};

const findLowerF = (currentNode, currentNeighbors) => {
  let minH = 999;
  let newNode = null;
  currentNeighbors.map(node => {
    if (node.h < minH && !node.isVisited) {
      minH = node.h;
      newNode = node;
      newNode.previousNode = currentNode;
    }
  });
  console.log(newNode);
  return newNode;
};
