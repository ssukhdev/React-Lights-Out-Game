import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: 0.30,
  };
  constructor(props) {
    super(props);
  // set initial state
    this.state = {hasWon: false, board: this.createBoard()};
  }

  // create a board nrows high/ncols wide, each cell randomly lit or unlit
  
  createBoard() {
    let board = [];
  // create array-of-arrays of true/false values
    let ncols = this.props.ncols;
    let nrows= this.props.nrows;
    for (let y = 0; y < nrows; y++){
      let row = [];
      for (let x = 0; x < ncols; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }

  // handle changing a cell: update board & determine if winner

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);

  // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board: board, hasWon: hasWon});
  }


  // Render game board or winning message.

  render() {
    // if the game is won, just show a winning msg & render nothing else
    if(this.state.hasWon){
      return (
          <div className='board-title'>
            <h1 className='neon-orange'>You </h1>
            <h1 className="neon-blue"> Win!</h1>
          </div> 
      )
    }
    // make table board
    let tBoard = [];
    for (let y = 0; y < this.props.nrows; y++){
      let row = [];
      for (let x = 0; x < this.props.ncols; x++){
        let coord = `${y}-${x}`
        row.push(
        <Cell key={coord} isLit={this.state.board[y][x]} 
        flipCellsAroundMe={() => this.flipCellsAround(coord)} />
        );
      }
      tBoard.push(<tr>{row}</tr>);
    }
    return (
      <div>
        <div className='board-title'>
          <div className='neon-orange'>Lights</div>
          <div className='neon-blue'>Out</div>
        </div>
          <table className='Board'>
            <tbody>{tBoard}</tbody>
          </table>
      </div>
    );


  }
}

export default Board;
