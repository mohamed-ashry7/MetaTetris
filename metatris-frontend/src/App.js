import "./App.css";
import React, { Component } from "react";

import MetaTrisBoard from "./Components/MetaTrisBoard/MetaTrisBoard";
import axios from "axios";
const playGameUrl = "http://localhost:4000/playGame";

class App extends Component {

  state = {
    mBoard: " \n ",
    score:0,
    gameOver:true
  };

  handleKeyPresses = (event) => {
    const keys = {
      37: 0, // Left  left arrow
      39: 1, // Right  right arrow
      32: 2, // hardDrop space
      65: 4, // rotate Left
      68: 5, // rotate right
    };
    const action = keys[event.keyCode] === undefined ? -1 : keys[event.keyCode];
    this.fetchData(action);
  };

  fetchData =(action=-1)=>{
    
      axios.put(playGameUrl, { action: action }).then((res) => {
        this.setState({ mBoard: res.data.mBoard ,gameOver:res.data.gameOver,score:res.data.score});
      });
    
  };

  playGame = () => {
    axios.post(playGameUrl).then((res) => {
      this.setState({ mBoard: res.data.mBoard ,gameOver:res.data.gameOver,score:res.data.score});
      const timer = setInterval(() => {
        this.fetchData();
        if(this.state.gameOver){
          clearInterval(timer);
        }
        
      }, 500);

    });
  };

  render() {
    return (
      <div>
        <header>The board</header>
          <MetaTrisBoard
            mBoard={this.state.mBoard.split('\n')}
            handleKeyPresses={this.handleKeyPresses}
          />
          <p>score: {this.state.score}</p>
        <button onClick={this.playGame}>playyy a Gameee</button>
      </div>
    );
  }
}


export default App;
