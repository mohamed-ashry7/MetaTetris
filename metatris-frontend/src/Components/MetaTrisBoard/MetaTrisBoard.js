import React from "react";
import Row from "./Row";
import "./MetaTrisBoard.css";

const MetaTrisBoard = ({ mBoard, handleKeyPresses }) => {
  const width = mBoard[0].length;
  const height = mBoard.length;
  const style = {
    gridTemplateColumns: `repeat( ${12}, 35px)`,
    gridTemplateRows: `repeat(${22}, 35px)`,
  };
  return (
    <div
      className="mboard"
      style={style}
      onKeyDown={(event) => handleKeyPresses(event)}
      tabIndex="0"
    >
      {mBoard.map((row) => (
        <Row row={row} />
      ))}
    </div>
  );
};

export default MetaTrisBoard;
