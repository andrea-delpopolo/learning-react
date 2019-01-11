import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={`square ${props.active}`}
      onClick={props.onClick}>
        {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        active={this.props.winnerLine.includes(i) ? 'active' : ''}
      />
    );
  }

  render() {
    let rows = Array(3).fill(null);
    let index = 0;
    for (let i=0;i<3;i++) {
      let row = Array(3).fill(null);
      for (let j=0;j<3;j++) {
        row[j] = this.renderSquare(index++)
      }
      rows.push(React.createElement('div', {className: 'board-row', key: i}, row));
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        indexes: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      asc: true,
      winnerLine: Array(3).fill(null),
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const indexes = current.indexes.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    indexes[this.state.stepNumber] = i;
    this.setState({
      history: history.concat([{
        squares: squares,
        indexes: indexes,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  reverse() {
    this.setState({
      asc: !this.state.asc,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.slice(1).map((step, move) => {
      const coord = calculateCoords(current.indexes[move]);
      const position = coord && coord.X != null ? `(${coord.X},${coord.Y})` : '';
      move += 1;
      const desc = 'Go to move #' + move;
      const cssClass = move === this.state.stepNumber ? 'active' : ''
      return (
        <li key={move}>
          <button className={cssClass} onClick={() => this.jumpTo(move)}>{desc}</button>&nbsp;
          <span>{position}</span>
        </li>
      );
    });

    if (!this.state.asc) {
      moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: '+ winner.player;
    }
    else if (moves.length === 9)
    {
      status = 'Draw! No winner!';
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerLine={winner ? winner.line : Array(3).fill(null)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>
            <li key="0">
              <button onClick={() => this.jumpTo("0")}>{'Go to game start'}</button>
            </li>
            {moves}
          </ul>
          <button onClick={ () => this.reverse()}>Reverse</button>
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
      return {
        player: squares[a],
        line: lines[i]
      }
    }
  }
  return null;
}

function calculateCoords(index) {
  let coord = {
    X: null,
    Y: null
  };
  switch(index) {
    case 0:
      coord.X = 0;
      coord.Y = 0;
      break;
    case 1:
      coord.X = 0;
      coord.Y = 1;
      break;
    case 2:
      coord.X = 0;
      coord.Y = 2;
      break;
    case 3:
      coord.X = 1;
      coord.Y = 0;
      break;
    case 4:
      coord.X = 1;
      coord.Y = 1;
      break;
    case 5:
      coord.X = 1;
      coord.Y = 2;
      break;
    case 6:
      coord.X = 2;
      coord.Y = 0;
      break;
    case 7:
      coord.X = 2;
      coord.Y = 1;
      break;
    case 8:
      coord.X = 2;
      coord.Y = 2;
      break;
    default:
      coord = null;
      break;
  }

  return coord;
}
  
