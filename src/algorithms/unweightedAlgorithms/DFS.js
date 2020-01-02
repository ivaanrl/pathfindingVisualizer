import getUnvisitedNeighbors from "../helpers/getUnvisitedNeighbors";

export default function DFS(
  grid,
  startNode,
  finishNode,
  visitedNodesInOrder = [],
  stack = [startNode]
) {
  //unvisitedNeighbors.forEach(node => {
  //  if (node === finishNode) {
  //    visitedNodesInOrder.push(finishNode);
  //    return visitedNodesInOrder;
  //  } else if (!node.isVisited) {
  //    DFS(grid, startNode, finishNode, visitedNodesInOrder);
  //  }
  //});
  while (stack.length !== 0) {
    let currentNode = stack.pop();
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    let currentNeighbors = getUnvisitedNeighbors(currentNode, grid);
    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }
    currentNeighbors.forEach(node => {
      if (!node.isWall) {
        node.previousNode = currentNode;
        stack.push(node);
      }
    });
  }
}
