import React from 'react';
import { useState } from 'react';
import './styles.css';

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    if (winner === 'Tie') {
      status = 'Tie';
    } else {
      status = 'Winner: ' + winner;
    }
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="gameMenu">
        <h1>Tic-Tac-Toe</h1>
        <div>
          <div id="instructions">
            <p>The game is played on a grid that's 3 squares by 3 squares.</p>
            <p>
              <b style={{ color: '#3E6990' }}>Player X</b> and{' '}
              <b style={{ color: '#AABD8C' }}>Player 0</b> take turns putting
              their marks in empty squares.{' '}
            </p>
            <p>
              The first player to get 3 of thier marks in a row{' '}
              <i>(up, down, across, or diagonally)</i> is the winner.
            </p>
          </div>
          <div className="status">
            <p className="status">{status}</p>
          </div>
          <button
            className="reset"
            onClick={() => setSquares(Array(9).fill(null))}
          >
            Reset Game
          </button>
        </div>
      </div>
      <div class="grid">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button
      id={value === 'X' ? 'playerX' : 'player0'}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  let tieCheck;
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

  for (let j = 0; j < squares.length; j++) {
    if (squares[j] !== 'X' && squares[j] !== 'O') {
      tieCheck = false;
      break;
    } else {
      tieCheck = true;
    }
  }

  if (tieCheck === true) {
    return 'Tie';
  }
  return null;
}

export default Game;
