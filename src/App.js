import React from 'react';
import logo from './logo.svg';
import './App.css';

class Tile {
  constructor(coor, color) {
    this.coor = coor
    this.color = color
  }

  moveUp() {
    const newCoor = this.coor.map((c) => [c[0], c[1]-1]);
    if (this.isValidMove(newCoor)) {
      this.coor = newCoor
    }

    return this.coor
  }

  moveDown(e0, e1) {

  }

  moveLeft(e0, e1) {

  }

  moveRight(e0, e1) {

  }

  isValidMove(newCoor) {
    let isValid = true;
    newCoor.forEach(function(c, index) {
      console.log(c)
      const x = c[0];
      const y = c[1];
      if (x < 0 || x > 3 || y < 0 || y > 4) {
        isValid = false;
        return;
      }
    })

    return isValid;
  }
}

function Cell(props) {
  // const style = "background: " + props.color + ";";
  return (
    <div class="cell" id={props.id} style={{background: props.tile.color}} onClick={() => props.onClick()} ></div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    const t0 = new Tile([[0,0], [0,1]], "cyan")
    const t1 = new Tile([[3,0], [3,1]], "cyan")
    const t2 = new Tile([[0,3], [0,4]], "cyan")
    const t3 = new Tile([[3,3], [3,4]], "cyan")

    const s0 = new Tile([[1,1]], "orange") 
    const s1 = new Tile([[2,1]], "orange") 
    const s2 = new Tile([[0,2]], "orange") 
    const s3 = new Tile([[3,2]], "orange") 

    const w0 = new Tile([[1,2], [2,2]], "brown")
    const b0 = new Tile([[1,3], [2,3], [1,4], [2,4]], "red")

    const e0 = new Tile([[1,0]], "white")
    const e1 = new Tile([[2,0]], "white")

    const tiles = {
      "0,0": t0,
      "0,1": t0,
      "1,0": e0,
      "2,0": e1,
      "1,1": s0,
      "2,1": s1,
      "3,0": t1,
      "3,1": t1,
      "0,2": s2,
      "1,2": w0,
      "2,2": w0,
      "3,2": s3,
      "0,3": t2,
      "0,4": t2,
      "1,3": b0,
      "2,3": b0,
      "1,4": b0,
      "2,4": b0,
      "3,3": t3,
      "3,4": t3,
    }

    
    this.state = {
      tiles: tiles,
      selectedTile: s0,
      emptyTiles: [e0,e1],
    };
  }

  changeState() {
    const tiles = Object.assign({}, this.state.tiles);
    tiles["11"] = "e"
    tiles["10"] = "s"
    this.setState({
      tiles: tiles
    })
  }

  moveUp() {
    const selectedTile = this.state.selectedTile
    const newCoor = selectedTile.moveUp()

    const tiles = Object.assign({}, this.state.tiles);
    const emptyTiles = Array.from(this.state.emptyTiles);
    
    newCoor.forEach(function(c, index) {
      tiles[c.toString()] = selectedTile
    })

    emptyTiles.forEach((e) => {
      console.log("hello")
      console.log(e)
      const ec = [e.coor[0], e.coor[1]+1]
      e.coor = ec;
      tiles[ec.toString()] = e
    })

    this.setState({
      tiles: tiles,
      emptyTiles: emptyTiles,
      selectedTile: selectedTile,
    })
  }

  moveDown() {

  }

  moveLeft() {

  }

  moveRight() {

  }

  selectTile(coor) {
    const selectedTile = this.state.tiles[coor]
    this.setState({
      selectedTile: selectedTile
    })
  }

  render() {

    return (
      <div class="board">
        <button onClick={() => this.moveUp()}>up</button>
        {/* <button onClick={() => this.changeState()}>down</button>
        <button onClick={() => this.changeState()}>left</button>
        <button onClick={() => this.changeState()}>right</button> */}
        <div class="row">
          < Cell id="0,0" tile={this.state.tiles["0,0"]} onClick={() => this.selectTile("0,0")} />
          < Cell id="1,0" tile={this.state.tiles["1,0"]} onClick={() => this.selectTile("1,0")} />
          < Cell id="2,0" tile={this.state.tiles["2,0"]} onClick={() => this.selectTile("2,0")} />
          < Cell id="3,0" tile={this.state.tiles["3,0"]} onClick={() => this.selectTile("3,0")} />
        </div>
        <div class="row">
          < Cell id="0,1" tile={this.state.tiles["0,1"]} onClick={() => this.selectTile("0,1")} />
          < Cell id="1,1" tile={this.state.tiles["1,1"]} onClick={() => this.selectTile("1,1")} />
          < Cell id="2,1" tile={this.state.tiles["2,1"]} onClick={() => this.selectTile("2,1")} />
          < Cell id="3,1" tile={this.state.tiles["3,1"]} onClick={() => this.selectTile("3,1")} />
        </div>
        <div class="row">
          < Cell id="0,2" tile={this.state.tiles["0,2"]} onClick={() => this.selectTile("0,2")} />
          < Cell id="1,2" tile={this.state.tiles["1,2"]} onClick={() => this.selectTile("1,2")} />
          < Cell id="2,2" tile={this.state.tiles["2,2"]} onClick={() => this.selectTile("2,2")} />
          < Cell id="3,2" tile={this.state.tiles["3,2"]} onClick={() => this.selectTile("3,2")} />
        </div>
        <div class="row">
          < Cell id="0,3" tile={this.state.tiles["0,3"]} onClick={() => this.selectTile("0,3")} />
          < Cell id="1,3" tile={this.state.tiles["1,3"]} onClick={() => this.selectTile("1,3")} />
          < Cell id="2,3" tile={this.state.tiles["2,3"]} onClick={() => this.selectTile("2,3")} />
          < Cell id="3,3" tile={this.state.tiles["3,3"]} onClick={() => this.selectTile("3,3")} />
        </div>
        <div class="row">
          < Cell id="0,4" tile={this.state.tiles["0,4"]} onClick={() => this.selectTile("0,4")} />
          < Cell id="1,4" tile={this.state.tiles["1,4"]} onClick={() => this.selectTile("1,4")} />
          < Cell id="2,4" tile={this.state.tiles["2,4"]} onClick={() => this.selectTile("2,4")} />
          < Cell id="3,4" tile={this.state.tiles["3,4"]} onClick={() => this.selectTile("3,4")} />
        </div>
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

