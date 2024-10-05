// import React, { useState } from "react";

import React from "react";
import { useState } from "react";

type squareProps = {
  value: string | null;
  onSquareClick: () => void;
};

type restartBtnProps = {
  onRestartClick: () => void;
};

const Square: React.FC<squareProps> = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

const RestartBtn: React.FC<restartBtnProps> = ({ onRestartClick }) => {
  return <button onClick={onRestartClick}>Restart</button>;
};

// X>O>X>Oにする。そのためには次がどっちなのかを都度判定する必要がある。

const Board = () => {
  // 盤面の状態を保存
  const [squares, setSquares] = useState(Array(9).fill(null));
  // 次のプレイヤー状態を保存
  const [isXNext, setIsXNext] = useState(true);

  // 勝敗決定のロジック
  // const checkWinner = (squares) => {
  // }

  // マスをクリックしたときに動く関数
  const onSquareClick = (i: number) => {
    // すでにマス目がうまっていたらエスケープ
    if (squares[i] !== null) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);

    // 勝敗判定
    const arrayForJudgment = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    arrayForJudgment.forEach((array) => {
      const [a, b, c] = array;
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        alert(`Winner ${newSquares[a]}`);
        return;
      }
    });

    setIsXNext(!isXNext);
  };

  const onRestartClick = () => {
    setSquares(Array(9).fill(null));
    console.log(squares);
  };

  return (
    <>
      <div className="game">
        <div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
            <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
            <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
            <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
            <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
            <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
            <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
          </div>
        </div>
        <div>
          <RestartBtn onRestartClick={onRestartClick} />
        </div>
      </div>
    </>
  );
};

const Game = () => {
  return <Board />;
};

export default Game;

/*
Squareで管理するもの => 表示の受け皿とクリックイベントの設置
Boardで管理するもの => 次のプレーヤー、各盤面の状態

----
valueがいま一意になっている、このままだと全部Xor全部Oになる
SquareのレンダリングのタイミングでそれぞれのSquareを別のものとして設定したい
----
勝敗と引き分けのロジックを追加したい

*/
