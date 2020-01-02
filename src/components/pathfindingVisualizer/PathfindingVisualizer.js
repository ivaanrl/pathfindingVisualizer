/* eslint-disable no-loop-func */
import React, { Component } from "react";
import Node from "../node/node";
import "./PathfindingVisualizer.css";
import { dijkstra } from "../../algorithms/weightedAlgorithms/dijkstra";
import getNodesInShortestPathOrder from "../../algorithms/getNodesInShortestPathOrder";
import Astar from "../../algorithms/weightedAlgorithms/Astar";

let start_node_row = 10;
let start_node_col = 15;
let end_node_row = 10;
let end_node_col = 35;
const nodeRef = [];
export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      isMousePressed: false,
      isAnimationRunning: false,
      insertingWalls: true,
      insertingWeights: false
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    if (this.state.isAnimationRunning) return;
    if (
      this.refs[`${row}-${col}`].props.isStart ||
      this.refs[`${row}-${col}`].props.isEnd
    ) {
      return;
    } else if (this.state.insertingWalls) {
      this.setWall(this.refs[`${row}-${col}`], "node-wall", row, col);
      const newGridWithWalls = getNewGridWithWalls(this.state.grid, row, col);
      this.setState({ grid: newGridWithWalls, isMousePressed: true });
    } else if (this.state.insertingWeights) {
      this.setWeight(this.refs[`${row}-${col}`], "node-weight", row, col);
      const newGridWithWeights = getNewGridWithWeights(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGridWithWeights, isMousePressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.isMousePressed) return;
    if (this.state.isAnimationRunning) return;

    if (this.state.insertingWalls) {
      this.setWall(this.refs[`${row}-${col}`], "node-wall", row, col);
      const newGrid = getNewGridWithWalls(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (this.state.insertingWeights) {
      this.setWeight(this.refs[`${row}-${col}`], "node-weight", row, col);
      const newGridWithWeights = getNewGridWithWeights(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGridWithWeights });
    }
  }

  setWeight = (ref, string) => {
    this.setNodeStyle(ref, string);
    ref.setWeight();
  };

  setWall = (ref, string) => {
    this.setNodeStyle(ref, string);
    ref.setWall();
  };

  handleMouseUp = () => {
    if (this.state.isAnimationRunning) return;
    this.setState({ isMousePressed: false });
  };

  handleDragOver = (row, col) => {
    if (row === start_node_row && col === start_node_col) {
    }
  };

  animateDijkstra = (visitedNodesInOrder, NodesInshortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(NodesInshortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        let node = visitedNodesInOrder[i];

        this.setNodeStyle(this.refs[`${node.row}-${node.col}`], "node-visited");
      }, 10 * i);
    }
  };

  setNodeStyle = (ref, string) => {
    ref.setNodeVisited(string);
  };

  setShortestPath = (ref, string) => {
    ref.setShortestPath(string);
  };

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        this.setShortestPath(
          this.refs[`${node.row}-${node.col}`],
          "node-shortest-path"
        );
      }, 40 * i);
      this.setState({ isAnimationRunning: false });
    }
  }

  visualizeDijkstra = () => {
    this.setState({ ...this.state, isAnimationRunning: true });
    const { grid } = this.state;
    const startNode = grid[start_node_row][start_node_col];
    const endNode = grid[end_node_row][end_node_col];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  createref = (row, col) => {
    return (nodeRef[row][col] = React.createRef());
  };

  changeStart = (row, col) => {
    console.log(this.refs[`${row}-${col}`].props.isStart);
  };

  visualizeAStar = () => {
    this.setState({ ...this.state, isAnimationRunning: true });
    const { grid } = this.state;
    const startNode = grid[start_node_row][start_node_col];
    const endNode = grid[end_node_row][end_node_col];
    const visitedNodesInOrder = Astar(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  render() {
    const { grid, isMousePressed } = this.state;

    return (
      <div>
        <div className="grid">
          <button onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's algorithm{" "}
          </button>
          <button
            onClick={() =>
              this.setState({
                insertingWalls: true,
                insertingWeights: false,
                changingStart: false
              })
            }
          >
            Insert Walls
          </button>
          <button
            onClick={() =>
              this.setState({
                insertingWalls: false,
                insertingWeights: true,
                changingStart: false
              })
            }
          >
            Insert weights
          </button>
          <button onClick={() => this.visualizeAStar()}>Visualize Astar</button>
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isStart, isEnd } = node;

                  return (
                    <Node
                      ref={`${row}-${col}`}
                      key={nodeIndex}
                      isStart={isStart}
                      isEnd={isEnd}
                      col={col}
                      row={row}
                      isMousePressed={isMousePressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      draggable
                      onMouseUp={() => this.handleMouseUp()}
                      onDragOver={(row, col) => this.handleDragOver(row, col)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    const node = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
      node.push([row, col]);
    }
    grid.push(currentRow);
    nodeRef.push(node);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === start_node_row && col === start_node_col,
    isEnd: row === end_node_row && col === end_node_col,
    isVisited: false,
    isWall: false,
    distance: Infinity,
    previousNode: null,
    isWeight: false,
    h: null
  };
};

const getNewGridWithWalls = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithWeights = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight: !node.isWeight
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

//const getNewGridWithChangedStartOrEnd = (grid, row, col) => {
//  const newGrid = grid.slice();
//  const oldStart = newGrid[start_node_row][start_node_col];
//  const noLongerStart = {
//    ...oldStart,
//    isStart: false
//  };
//  newGrid[start_node_row][start_node_col] = noLongerStart;
//  const node = newGrid[row][col];
//  const newStart = {
//    ...node,
//    isStart: true
//  };
//  newGrid[row][col] = newStart;
//  start_node_row = row;
//  start_node_col = col;
//  return newGrid;
//};
