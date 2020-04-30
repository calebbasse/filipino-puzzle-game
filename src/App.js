import React from 'react';
import logo from './logo.svg';
import './App.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const squares = Array(20).fill(true)
    
    const tiles = [
      ["00","01"],
      ["11"],
      ["21"],
      ["30","31"],
      ["02"],
      ["12","22"],
      ["32"],
      ["03","04"],
      ["13","23","14","24"],
      ["33","34"]
    ]
    squares[1] = false;
    squares[2] = false;
    
    this.state = {
      squares: squares,
      tiles: tiles,
    };
  }
  
  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   squares[i] = this.state.xIsNext ? 'X': 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext
  //   });
  // }
  
  renderSquare(i) {
    return <Square 
             value={this.state.squares[i]}
             onClick={() => this.handleClick(i)}
           />;
  }

  render() {
    const rows = []
    var cells = []
    for (let i = 0; i <= 4; i++) {
      cells = []
      for (let j = 0; j <= 3; j++) {
        var coor = i.toString() + j.toString();
        cells.push(<div class="cell" id={coor}></div>)
      }
      rows.push(<div class="row">{cells}</div>)

    }

    for (const tile in this.state.tiles) {
      if (object.hasOwnProperty(tile)) {
        const element = object[tile];
        
      }
    }



    return (
      <div class="board">
        {rows}
      </div>
    );
  }
}


// ========================================


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Board;

