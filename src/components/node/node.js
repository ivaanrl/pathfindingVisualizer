import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeVisited: "",
      isWall: false,
      isWeight: false
    };
  }

  setNodeVisited = string => {
    if (!this.state.isWall && !this.state.isWeight) {
      this.setState({ nodeVisited: string });
    }
  };

  setShortestPath = string => {
    this.setState({ nodeVisited: string });
  };

  setWall = () => {
    this.setState({ isWall: true });
    this.props = { ...this.props, isWall: true };
  };

  setWeight = () => {
    this.setState({ isWeight: true });
    this.props = { ...this.props, isWeight: true };
  };

  render() {
    const {
      row,
      col,
      isEnd,
      isStart,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;
    const extraClassName = isEnd ? "node-finish" : isStart ? "node-start" : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName} ${this.state.nodeVisited} `}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
        draggable={isStart || isEnd ? true : null}
      ></div>
    );
  }
}
