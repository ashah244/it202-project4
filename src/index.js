import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
      <button
        className="square"
        onClick={props.onClick}>
          {props.value}
      </button>
    );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      counter: 0,
    };
  }

  handleClick(i){
    const squares = this.state.squares.slice();

    if(calculateWinner(squares) || squares[i]){
      return;
    }

    if(this.state.xIsNext === true){
      squares[i] = 'X';
    }
    else{
      squares[i] = 'O';
    }
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    var status = 'Next player: ';

    //check if winner
    if(winner){
      status = "Winner: " + winner;
    }
    else{
      this.state.counter = this.state.counter + 1;
      if(this.state.xIsNext === true){
        status = status + 'X ';
      }
      else{
        status = status + 'O ';
      }
    }

    //check if draw
    if(this.state.counter === 10 && winner === null){
      status = "Draw";
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  //each winning position
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
