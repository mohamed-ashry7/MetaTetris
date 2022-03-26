import './App.css';
import React,{Component} from 'react';

import MetaTrisBoard from './Components/MetaTrisBoard/MetaTrisBoard';



class App extends Component {

  state = {
    mBoard:
    ["o----------o",
    "|          |",
    "|          |",
    "|  X       |",
    "|  X       |",
    "| XX       |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "|          |",
    "o----------o"]
  }
  render() {
    return(

      <div>
        <header>The board</header>
        <MetaTrisBoard mBoard ={this.state.mBoard}/>
      </div>
    );
  }
}



//  Will be converted to Hooks afterwards;
// function App() {
//   return (
//     <div className="App">
//       <header>Hello Tetris</header>
//     </div>
//   );
// }

export default App;