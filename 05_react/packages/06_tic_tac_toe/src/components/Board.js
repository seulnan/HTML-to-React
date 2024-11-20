import React, { useState, useEffect } from 'react';

function Board({ currentTurn, setCurrentTurn, onGameEnd, gameMode, playerSymbol, computerSymbol }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  useEffect(() => {
    if (gameMode === 'COMPUTER' && currentTurn === computerSymbol && !isComputerTurn) {
      handleComputerTurn(board);
    }
  }, [currentTurn, board, gameMode, computerSymbol, playerSymbol, isComputerTurn]);

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

  const handleClick = (index) => {
    if (board[index] || (gameMode === 'COMPUTER' && currentTurn === computerSymbol)) return;

    const newBoard = [...board];
    newBoard[index] = currentTurn;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
        if (onGameEnd) onGameEnd(winner); // onGameEnd가 정의되지 않았을 경우를 대비
    } else {
        setCurrentTurn((prev) => (prev === 'X' ? 'O' : 'X'));
    }
};

  const handleComputerTurn = (board) => {
    const availableIndices = board.map((cell, index) => (cell === null ? index : null)).filter((val) => val !== null);
    if (availableIndices.length === 0) return;

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = computerSymbol;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      onGameEnd(winner);
    } else {
      setCurrentTurn(playerSymbol);
    }
    setIsComputerTurn(false); // 컴퓨터 턴이 끝나면 플레이어 턴으로 변경
  };

  const handleMouseEnter = (index) => {
    if (!board[index] && (gameMode === 'PLAYER' || currentTurn === playerSymbol || currentTurn === 'X')) {
      setHoverIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
      {board.map((cell, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            border: '1px solid black',
            position: 'relative',
            backgroundColor: cell ? '#f0f0f0' : '',
            cursor: cell ? 'not-allowed' : 'pointer',
          }}
        >
          {cell}
          {hoverIndex === index && !cell && (
            <span
              style={{
                position: 'absolute',
                fontSize: '24px',
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {currentTurn}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Board;
