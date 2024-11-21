import React, { useState, useEffect } from 'react';
import hoverCross from '../assets/hover_Cross.svg';
import hoverCircle from '../assets/hover_Circle.svg';
import playCross from '../assets/Play_Cross.svg';
import playCircle from '../assets/Play_Circle.svg';

function Board({ board, setBoard, currentTurn, setCurrentTurn, onGameEnd, gameMode, playerSymbol, computerSymbol }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : 'DRAW';
  };

  // 컴퓨터의 턴을 처리
  useEffect(() => {
    if (gameMode === 'COMPUTER' && currentTurn === computerSymbol) {
      const winner = checkWinner(board);
      if (winner) return; // 이미 승자가 있으면 컴퓨터 동작 차단

      const availableIndices = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((val) => val !== null);

      if (availableIndices.length === 0) return;

      // 랜덤으로 빈 칸 선택
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      const newBoard = [...board];
      newBoard[randomIndex] = computerSymbol;
      setBoard(newBoard);

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        onGameEnd(newWinner); // 한 번만 호출되도록 보장
      } else {
        setCurrentTurn(playerSymbol); // 턴을 사용자에게 넘김
      }
    }
  }, [currentTurn, board, gameMode, computerSymbol, playerSymbol, setBoard, onGameEnd, setCurrentTurn]);

  const handleClick = (index) => {
    if (board[index] || (gameMode === 'COMPUTER' && currentTurn === computerSymbol)) return;

    const newBoard = [...board];
    newBoard[index] = currentTurn;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      onGameEnd(winner);
    } else {
      setCurrentTurn((prev) => (prev === 'X' ? 'O' : 'X'));
    }
  };

  const handleMouseEnter = (index) => {
    if (!board[index]) {
      setHoverIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 140px)',
        gap: '10px',
      }}
    >
      {board.map((cell, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '140px',
            height: '140px',
            backgroundColor: cell ? '#1A2A33' : '#1F3641',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: cell
              ? `url(${cell === 'X' ? playCross : playCircle})`
              : hoverIndex === index
              ? `url(${currentTurn === 'X' ? hoverCross : hoverCircle})`
              : '',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            cursor: cell ? 'not-allowed' : 'pointer',
            borderRadius: '15px',
          }}
        ></div>
      ))}
    </div>
  );
}

export default Board;
