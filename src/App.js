import React from 'react';
import logo from './logo.svg';
import './App.css';

class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return this.x.toString() + ',' + this.y.toString();
  }
}

class Tile {
  constructor(cells, color) {
    this.cells = cells
    this.color = color
  }

  moveUp(emptyTiles) {
    const proposedNewCells = this.cells.map((c) => new Cell(c.x, c.y-1));
    if (this.isValidMove(this.cells, proposedNewCells, emptyTiles)) {
      this.cells = proposedNewCells;
    }

    return this.cells, emptyTiles
  }

  moveDown(e0, e1) {

  }

  moveLeft(e0, e1) {

  }

  moveRight(e0, e1) {

  }

  isValidMove(currentCells, proposedNewCells, emptyTiles) {
    
    // Check if new tile position is within the constraints of the board
    proposedNewCells.forEach((c) => {
      if (c.x < 0 || c.x > 3 || c.y < 0 || c.y > 4) {
        return false;
      }
    })


    let requiredEmptyCells = diffBetweenTwoCellArrays(currentCells, proposedNewCells)
    console.log(requiredEmptyCells)

    let isValid = true;
    let isEmpty = false;
    requiredEmptyCells.forEach((rec) => {
      isEmpty = false;
      emptyTiles.forEach((e) => {
        console.log("insinfef")
        console.log(rec, e)
        if (e.cells[0].x == rec.x && e.cells[0].y == rec.y) {
          isEmpty = true;
        } 
      })
      console.log(isEmpty)
      if (!isEmpty) {
        isValid = false;
      }
    })
    
    console.log("is valid ", isValid)

    return isValid;
  }
}

function CellComp(props) {
  // const style = "background: " + props.color + ";";
  return (
    <div class="cell" id={props.id} style={{background: props.tile.color}} onClick={() => props.onClick()} ></div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    const t0 = new Tile([new Cell(0,0), new Cell(0,1)], "cyan")
    const t1 = new Tile([new Cell(3,0), new Cell(3,1)], "cyan")
    const t2 = new Tile([new Cell(0,3), new Cell(0,4)], "cyan")
    const t3 = new Tile([new Cell(3,3), new Cell(3,4)], "cyan")

    const s0 = new Tile([new Cell(1,1)], "orange") 
    const s1 = new Tile([new Cell(2,1)], "orange") 
    const s2 = new Tile([new Cell(0,2)], "orange") 
    const s3 = new Tile([new Cell(3,2)], "orange") 

    const w0 = new Tile([new Cell(1,2), new Cell(2,2)], "brown")
    const b0 = new Tile([new Cell(1,3), new Cell(2,3), new Cell(1,4), new Cell(2,4)], "red")

    const e0 = new Tile([new Cell(1,0)], "white")
    const e1 = new Tile([new Cell(2,0)], "white")

    const board = {
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
      board: board,
      selectedTile: s0,
      emptyTiles: [e0,e1],
    };
  }

  // changeState() {
  //   const tiles = Object.assign({}, this.state.board);
  //   tiles["11"] = "e"
  //   tiles["10"] = "s"
  //   this.setState({
  //     tiles: tiles
  //   })
  // }

  updateBoard(oldCells) {
    const selectedTile = this.state.selectedTile
    const board = Object.assign({}, this.state.board);
    const emptyTiles = Array.from(this.state.emptyTiles);

    console.log('updateBoard()')
    selectedTile.cells.forEach(function(c, index) {
      board[c.toString()] = selectedTile
    })

    const newEmptyCells = diffBetweenTwoCellArrays(selectedTile.cells, oldCells)

    console.log(newEmptyCells)

    newEmptyCells.forEach((c) => {
      if (emptyTiles.includes(emptyTiles[0].cells[0])) {
        const e0 = emptyTiles[0]
        e0.cells[0] = c;
        board[c.toString()] = e0
      } else {
        const e1 = emptyTiles[1]
        e1.cells[0] = c;
        board[c.toString()] = e1
      }
    })

    console.log(emptyTiles[0], emptyTiles[1])
    this.setState({
      board: board,
      emptyTiles: emptyTiles,
      selectedTile: selectedTile,
    })
  }

  moveUp() {
    const selectedTile = this.state.selectedTile
    const oldCells = Array.from(selectedTile.cells)
    const emptyTiles = Array.from(this.state.emptyTiles);
    // const board = Object.assign({}, this.state.board);

    const newCells = selectedTile.moveUp(emptyTiles);
    this.updateBoard(oldCells)
    // newCells.forEach(function(c, index) {
    //   board[c.toString()] = selectedTile
    // })


    // const newEmptyCoor = diffBetweenTwoCellArrays(newCells, oldCells)

    // newEmptyCoor.forEach((c) => {
    //   if (emptyTiles[0].coor[0] in newCells) {
    //     const e0 = emptyTiles[0]
    //     e0.coor[0] = c;
    //     board[c.toString()] = e0
    //   } else {
    //     const e1 = emptyTiles[0]
    //     e1.coor[0] = c;
    //     board[c.toString()] = e1
    //   }
    // })
    
    


    // // emptyTiles.forEach((e) => {
    // //   const ec = [e.coor[0][0], e.coor[0][1]+1]
    // //   console.log(ec)
    // //   e.coor = ec;
    // //   tiles[ec.toString()] = e
    // //   console.log("HELLO");
    // //   console.log(e);
    // // })

    // this.setState({
    //   board: board,
    //   emptyTiles: emptyTiles,
    //   selectedTile: selectedTile,
    // })

    // console.log(this.state)

  }

  moveDown() {

  }

  moveLeft() {

  }

  moveRight() {

  }

  selectTile(coor) {
    const selectedTile = this.state.board[coor]
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
          < CellComp id="0,0" tile={this.state.board["0,0"]} onClick={() => this.selectTile("0,0")} />
          < CellComp id="1,0" tile={this.state.board["1,0"]} onClick={() => this.selectTile("1,0")} />
          < CellComp id="2,0" tile={this.state.board["2,0"]} onClick={() => this.selectTile("2,0")} />
          < CellComp id="3,0" tile={this.state.board["3,0"]} onClick={() => this.selectTile("3,0")} />
        </div>
        <div class="row">
          < CellComp id="0,1" tile={this.state.board["0,1"]} onClick={() => this.selectTile("0,1")} />
          < CellComp id="1,1" tile={this.state.board["1,1"]} onClick={() => this.selectTile("1,1")} />
          < CellComp id="2,1" tile={this.state.board["2,1"]} onClick={() => this.selectTile("2,1")} />
          < CellComp id="3,1" tile={this.state.board["3,1"]} onClick={() => this.selectTile("3,1")} />
        </div>
        <div class="row">
          < CellComp id="0,2" tile={this.state.board["0,2"]} onClick={() => this.selectTile("0,2")} />
          < CellComp id="1,2" tile={this.state.board["1,2"]} onClick={() => this.selectTile("1,2")} />
          < CellComp id="2,2" tile={this.state.board["2,2"]} onClick={() => this.selectTile("2,2")} />
          < CellComp id="3,2" tile={this.state.board["3,2"]} onClick={() => this.selectTile("3,2")} />
        </div>
        <div class="row">
          < CellComp id="0,3" tile={this.state.board["0,3"]} onClick={() => this.selectTile("0,3")} />
          < CellComp id="1,3" tile={this.state.board["1,3"]} onClick={() => this.selectTile("1,3")} />
          < CellComp id="2,3" tile={this.state.board["2,3"]} onClick={() => this.selectTile("2,3")} />
          < CellComp id="3,3" tile={this.state.board["3,3"]} onClick={() => this.selectTile("3,3")} />
        </div>
        <div class="row">
          < CellComp id="0,4" tile={this.state.board["0,4"]} onClick={() => this.selectTile("0,4")} />
          < CellComp id="1,4" tile={this.state.board["1,4"]} onClick={() => this.selectTile("1,4")} />
          < CellComp id="2,4" tile={this.state.board["2,4"]} onClick={() => this.selectTile("2,4")} />
          < CellComp id="3,4" tile={this.state.board["3,4"]} onClick={() => this.selectTile("3,4")} />
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

function diffBetweenTwoCellArrays(cellsA, cellsB) {
  let celldD = new Array();
  let exclude = false;
  cellsB.forEach((cB) => {
    exclude = false;
    cellsA.forEach((cA) => {
      if (cA.x == cB.x && cA.y == cB.y) {
        exclude = true;
      }
    })

    if (!exclude) {
      celldD.push((cB))
    }

  })

  return celldD
}

export default Board;

