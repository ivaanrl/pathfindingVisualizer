import getUnvisitedNeighbors from "../helpers/getUnvisitedNeighbors";

export default function BFS(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const priorityQueue = [startNode];
  while (priorityQueue.length !== 0) {
    console.log(priorityQueue);
    let currentNode = priorityQueue.pop();
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    } else {
      let currentNeighbors = getUnvisitedNeighbors(currentNode, grid);

      currentNeighbors.forEach(node => {
        if (!node.isWall && !node.isVisited) {
          priorityQueue.push(node);
        }
      });
    }
  }
}
