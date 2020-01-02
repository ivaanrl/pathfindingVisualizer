import getUnvisitedNeighbors from "../helpers/getUnvisitedNeighbors";

export default function BFS(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const priorityQueue = [startNode];
  startNode.distance = 0;
  startNode.h = 0;

  while (priorityQueue.length < 50) {
    let currentNode = priorityQueue.shift();
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    let currentNeighbors = getUnvisitedNeighbors(currentNode, grid);
    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    } else {
      currentNeighbors.forEach(node => {
        if (!node.isWall) {
          node.isVisited = true;
          node.previousNode = currentNode;
          priorityQueue.push(node);
        }
      });
    }
    if (priorityQueue.length === 0) {
      return visitedNodesInOrder;
    }
  }
}
