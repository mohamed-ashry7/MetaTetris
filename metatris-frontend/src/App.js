import './App.css';
import React,{Component} from 'react';

import MetaTrisBoard from './Components/MetaTrisBoard/MetaTrisBoard';



class App extends Component {

  state = {
    mBoard:
    [
      "o----------o",
      "|    RR    |",
      "|     B    |",
      "|     B    |",
      "|    BB    |",
      "|    GG    |",
      "|     GG   |",
      "|     P    |",
      "|    PPP   |",
      "|     P    |",
      "|    PPP   |",
      "|     B    |",
      "|     B    |",
      "|    BB    |",
      "|     C    |",
      "|     C    |",
      "|     C    |",
      "|     C    |",
      "|     O    |",
      "|     O    |",
      "|     OO   |",
      "o----------o"
      
  ]
  }

  handleKeyPresses = (event)=>{
    
    const keys = {
      37:0,  // Left  left arrow
      39:1,  // Right  right arrow
      32:2,  // hardDrop space
      65:4,  // rotate Left
      68:5   // rotate right
    }
    console.log(keys[event.keyCode]||-1)
  }

  render() {
    return(

      <div>
        <header>The board</header>
        <MetaTrisBoard mBoard ={this.state.mBoard} handleKeyPresses={this.handleKeyPresses}/>
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