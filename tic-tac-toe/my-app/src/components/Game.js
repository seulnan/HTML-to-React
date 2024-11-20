import React, { useState, useEffect } from 'react';
import Board from './Board';
import Status from './Status';
import Modal from './Modal'; // First modal component
import RestartModal from './RestartModal'; // Second modal component

const Game = ({ mode, playerSymbol, onExit }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(playerSymbol === 'X');
  const [showResultModal, setShowResultModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningSymbol, setWinningSymbol] = useState(null);

  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [cpuWins, setCpuWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const cpuSymbol = playerSymbol === 'X' ? 'O' : 'X';

  useEffect(() => {
    if (mode === 'cpuVsPlayer' && !xIsNext && !winner) {
      const cpuMove = getCPUMove(board);
      const newBoard = board.slice();
      newBoard[cpuMove] = cpuSymbol;
      setBoard(newBoard);

      const cpuWinner = calculateWinner(newBoard);
      if (cpuWinner) {
        setWinner('CPU');
        setWinningSymbol(cpuSymbol);
        setCpuWins((prevCpuWins) => prevCpuWins + 1);
        setShowResultModal(true);
      } else if (newBoard.every((square) => square !== null)) {
        setDraws((prevDraws) => prevDraws + 1);
        resetGame(); // 바로 재시작
      } else {
        setXIsNext(true);
      }
    }
  }, [board, cpuSymbol, mode, winner, xIsNext]);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = board.slice();
    const currentSymbol = xIsNext ? playerSymbol : cpuSymbol;
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(
        xIsNext
          ? mode === 'playerVsPlayer'
            ? 'Player 1'
            : 'Player'
          : mode === 'playerVsPlayer'
          ? 'Player 2'
          : 'CPU'
      );
      setWinningSymbol(currentSymbol);
      if (xIsNext) {
        setPlayer1Wins((prevWins) => prevWins + 1);
      } else {
        if (mode === 'playerVsPlayer') {
          setPlayer2Wins((prevWins) => prevWins + 1);
        } else {
          setCpuWins((prevWins) => prevWins + 1);
        }
      }
      setShowResultModal(true);
    } else if (newBoard.every((square) => square !== null)) {
      setDraws((prevDraws) => prevDraws + 1);
      resetGame(); // 바로 재시작
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(playerSymbol === 'X');
    setShowResultModal(false);
    setShowRestartModal(false);
    setWinner(null);
    setWinningSymbol(null);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    if (!winner) {
      resetGame();
    } else {
      setTimeout(() => setShowRestartModal(true), 300);
    }
  };

  const handleRestart = () => {
    resetGame();
    setShowRestartModal(false);
  };

  return (
  <div>
    <Status winner={winner} xIsNext={xIsNext} isDraw={board.every((square) => square !== null)} />
    <Board squares={board} onClick={handleClick} />
    <button onClick={resetGame}>게임 재시작</button>

    <div>
      <h3>승리 횟수</h3>
      {mode === 'playerVsPlayer' ? (
        <>
          <p>P1 ({playerSymbol}): {player1Wins}</p>
          <p>P2 ({playerSymbol === 'X' ? 'O' : 'X'}): {player2Wins}</p>
        </>
      ) : (
        <>
          <p>P1 ({playerSymbol}): {player1Wins}</p>
          <p>CPU ({cpuSymbol}): {cpuWins}</p>
        </>
      )}
      <p>비긴 횟수: {draws}</p>
    </div>

    {showResultModal && (
      <Modal
        winner={winner}
        winningSymbol={winningSymbol}
        onClose={closeResultModal}
        onExit={onExit} // 모달에서만 "나가기" 버튼 표시
        mode={mode}
        buttonOrder="exitFirst" // 버튼 순서 변경을 위한 prop 추가
      />
    )}

    {showRestartModal && (
      <RestartModal
        onRestart={handleRestart}
        onCancel={onExit} // cancel 시 onExit 호출
        buttonOrder="exitFirst" // 버튼 순서 변경을 위한 prop 추가
      />
    )}
  </div>
);

};

const getCPUMove = (board) => {
  const availableMoves = board
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const calculateWinner = (squares) => {
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
};

export default Game;
