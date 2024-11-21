import React, { useState, useEffect } from 'react';
import Board from './Board';
import Status from './Status';
import Modal from './Modal';
import RestartModal from './RestartModal';
import logoImage from '../assets/image/Menu_ox.png';
import xImage from '../assets/image/icon_x.png';
import oImage from '../assets/image/icon_o.png';
import refreshImage from '../assets/image/restart_main.png';

const Game = ({ mode, playerSymbol, onExit }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(playerSymbol !== 'O'); // P1이 'O'를 선택한 경우 xIsNext를 false로 설정
  const [showResultModal, setShowResultModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningSymbol, setWinningSymbol] = useState(null);

  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [cpuWins, setCpuWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const cpuSymbol = playerSymbol === 'X' ? 'O' : 'X';
  
  // 현재 턴에 맞는 이미지 선택
  const currentTurnImage = xIsNext ? xImage : oImage;

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
    setXIsNext(true);  // 항상 X가 먼저 시작
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
      <div className="header">
        <img src={logoImage} alt="Logo" className="logo" />
        <img src={currentTurnImage} alt="Current Turn" className="current-turn" />
        <button className="button-refresh-button" onClick={handleRestart}> 
          <img src={refreshImage} alt="Restart" />
        </button> 
      </div>
      
      <Status winner={winner} xIsNext={xIsNext} isDraw={board.every((square) => square !== null)} />
      <Board squares={board} onClick={handleClick} />

      <div className="score-board">
        <div className="score-box">
          <h3>P1 ({playerSymbol})</h3>
          <p>승리 횟수: {player1Wins}</p>
        </div>
        <div className="score-box">
          <h3>타이</h3>
          <p>비긴 횟수: {draws}</p>
        </div>
        <div className="score-box">
          <h3>{mode === 'cpuVsPlayer' ? 'CPU' : `P2 (${playerSymbol === 'X' ? 'O' : 'X'})`}</h3>
          <p>승리 횟수: {mode === 'cpuVsPlayer' ? cpuWins : player2Wins}</p>
        </div>
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
