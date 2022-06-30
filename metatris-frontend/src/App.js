import "./App.css";
import React, { Component } from "react";

import MetaTrisBoard from "./Components/MetaTrisBoard/MetaTrisBoard";
import axios from "axios";
const playGameUrl = "http://localhost:4000/playGame";

class App extends Component {
  state = {
    mBoard: " \n ",
    score: 0,
    gameOver: true,
  };

  handleKeyPresses = (event) => {
    const keys = {
      37: 0, // Left  Left Arrow
      39: 1, // Right  Right Arrow
      83: 2, // hardDrop S-Key
      40: 3, // softDrop Down Arrow
      65: 4, // rotate Left A-Key
      68: 5, // rotate right D-Key
    };
    const action = keys[event.keyCode] === undefined ? -1 : keys[event.keyCode];
    this.fetchData(action);
  };

  fetchData = (action = -1) => {
    axios.put(playGameUrl, { action: action }).then((res) => {
      this.setState({
        mBoard: res.data.mBoard,
        gameOver: res.data.gameOver,
        score: res.data.score,
      });
    });
  };

  playGame = () => {
    axios.post(playGameUrl).then((res) => {
      this.setState({
        mBoard: res.data.mBoard,
        gameOver: res.data.gameOver,
        score: res.data.score,
      });
      const timer = setInterval(() => {
        this.fetchData();
        if (this.state.gameOver) {
          clearInterval(timer);
        }
      }, 500);
    });
  };

  render() {
    return (
      <div>
          <button type="button" className="btn btn-primary" onClick={this.playGame}>
            Start The Game
          </button>
          <p className="p-2 mb-2 bg-success text-white" style={{width:"70px"}}> Score: {this.state.score}</p>

        <div
          className="center"
        >

          <MetaTrisBoard
            mBoard={this.state.mBoard.split("\n")}
            handleKeyPresses={this.handleKeyPresses}
            score ={this.state.score}
            playGame = {this.playGame}
          />
        </div>


      </div>
    );
  }
}

export default App;
