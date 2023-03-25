import React, { useState, StrictMode } from "react";
import Square from "./Square";


export default function Board() {

const [squares, setSquares] = useState(Array(9).fill(null))
const [histSquares, setHistSquares] = useState([])
const [xIsNext, setXIsNext] = useState(true)
const [winner, setWinner] = useState('')
const [xScore, setXScore] = useState(0)
const [oScore, setOScore] = useState(0)

function goToMovement(i) {
    setSquares(histSquares[i])
}

function putScore(player) {
    if (player == 'X')
        setXScore(xScore + 1)
    if (player == 'O')
        setOScore(oScore + 1)
}

function checkWinner(arr) {
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

    let winner;
    lines.forEach((item) => {
        if (arr[item[0]] && arr[item[0]] === arr[item[1]] && arr[item[1]] === arr[item[2]]) {
            setWinner(arr[item[0]]);
            putScore(arr[item[0]]);
        }
    });

    return winner;
}

  function resetGame() {
    resetMatch();
    setXScore(0);
    setOScore(0);
  }

  function resetMatch() {
    let cleanSquares = Array(9).fill(null);
    setSquares(cleanSquares);
    setWinner('');
    setXIsNext(true);
    setHistSquares([]);
  }

  function handleClick(i) {
    let nextSquares = squares.slice();
    if (nextSquares[i] === null && winner === '') {
        nextSquares[i] = xIsNext ? 'X': 'O';
        setXIsNext(!xIsNext);
        setSquares(nextSquares);
        checkWinner(nextSquares)
        let nextHistSquare = [...histSquares, nextSquares];
        setHistSquares(nextHistSquare);
    }
  }

  return (
    <div>    
        <div className="dashboard">
            <div>
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
            <div>
                <h1>History</h1>
                <ul>
                    {histSquares.map((item, i) => {
                        return (
                            <li key={i}>
                                <button onClick={() => goToMovement(i)}>Movement #{i}</button>
                            </li>)
                    })}
                </ul>
            </div>
            <div>
                <h1>Score</h1>
                <div className="container">
                    <div>X Player: {xScore}</div>
                    <div>O Player: {oScore}</div>
                </div>
            </div>
        </div>
        <hr/>
        <div>The winner is {winner}</div>
        <div><button onClick={() => resetMatch()}>Reset Match</button></div>
        <div><button onClick={() => resetGame()}>Reset Game</button></div>
    </div>
  );
}
