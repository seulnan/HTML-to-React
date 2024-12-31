import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import Modal from '../components/Modal';
import RestartModal from '../components/RestartModal';
import logoImage from '../assets/image/Menu_ox.png';
import xImage from '../assets/image/icon_x.png';
import oImage from '../assets/image/icon_o.png';
import refreshImage from '../assets/image/restart_main.png';
import refreshHoverImage from '../assets/image/restart_hover.png';
import o_turn from '../assets/image/o_turn.png';
import x_turn from '../assets/image/x_turn.png';

const Game = ({ mode, playerSymbol, onExit }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(playerSymbol === 'X');
  const [showResultModal, setShowResultModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningSymbol, setWinningSymbol] = useState(null);
  const [winningLine, setWinningLine] = useState(null);

  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [cpuWins, setCpuWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const cpuSymbol = playerSymbol === 'X' ? 'O' : 'X';
  const currentTurnImage =
    playerSymbol === 'O'
      ? xIsNext
        ? o_turn
        : x_turn
      : xIsNext
      ? x_turn
      : o_turn;

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (mode === 'cpuVsPlayer' && !xIsNext && !winner) {
      const cpuMove = getCPUMove(board);
      if (cpuMove === null) return;

      const newBoard = board.slice();
      newBoard[cpuMove] = cpuSymbol;
      setBoard(newBoard);

      const { winner: cpuWinner, winningLine: line } = calculateWinner(newBoard);
      if (cpuWinner) {
        setWinner('CPU');
        setWinningSymbol(cpuSymbol);
        setWinningLine(line);
        setCpuWins((prevCpuWins) => prevCpuWins + 1);
        setShowResultModal(true);
      } else if (newBoard.every((square) => square !== null)) {
        if (!showResultModal) {
          setDraws((prevDraws) => prevDraws + 1);
          setWinner(null);
          setShowResultModal(true);
        }
      } else {
        setXIsNext(true);
      }
    }
  }, [board, cpuSymbol, mode, winner, xIsNext, showResultModal]);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = board.slice();
    const currentSymbol = xIsNext ? playerSymbol : cpuSymbol;
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    const { winner: gameWinner, winningLine: line } = calculateWinner(newBoard);
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
      setWinningLine(line);

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
      if (!showResultModal) {
        setDraws((prevDraws) => prevDraws + 1);
        setWinner(null);
        setShowResultModal(true);
      }
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
    setWinningLine(null);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setShowRestartModal(true);
  };

  const handleRestart = () => {
    resetGame();
    setShowRestartModal(false);
  };

  const getCPUMove = (board) => {
    const availableMoves = board
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);
    return availableMoves.length > 0
      ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
      : null;
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
        return { winner: squares[a], winningLine: lines[i] };
      }
    }
    return { winner: null, winningLine: null };
  };

  return (
    <div>
      <div className="header">
        <img src={logoImage} alt="Logo" className="logo" />
        <img src={currentTurnImage} alt="Current Turn" className="current-turn" />
        <button
          className="button-refresh-button"
          onClick={handleRestart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundImage: `url(${isHovered ? refreshHoverImage : refreshImage})`
          }}
        />
      </div>

      <Board
        squares={board}
        onClick={handleClick}
        currentPlayer={playerSymbol === 'X' ? (xIsNext ? 'X' : 'O') : (xIsNext ? 'O' : 'X')}
        winningLine={winningLine}
      />

      <div className="score-board">
        <div className="score-box" style={{ backgroundColor: '#31C3BD' }}>
          <h3>
            {mode === 'cpuVsPlayer'
              ? `${playerSymbol === 'X' ? `${playerSymbol} (YOU)` : `${cpuSymbol} (CPU)`}`
              : `${playerSymbol === 'X' ? `${playerSymbol} (P1)` : `${cpuSymbol} (P2)`}`}
          </h3>
          <p>{mode === 'cpuVsPlayer' ? `${playerSymbol === 'X' ? player1Wins : cpuWins}` : `${playerSymbol === 'X' ? player1Wins : player2Wins}`}</p>
        </div>

        <div className="score-box" style={{ backgroundColor: '#A8BFC9' }}>
          <h3>TIES</h3>
          <p>{draws}</p>
        </div>

        <div className="score-box" style={{ backgroundColor: '#F2B137' }}>
          <h3>
            {mode === 'cpuVsPlayer'
              ? `${playerSymbol === 'X' ? `${cpuSymbol} (CPU)` : `${playerSymbol} (YOU)`}`
              : `${playerSymbol === 'X' ? `${cpuSymbol} (P2)` : `${playerSymbol} (P1)`}`}
          </h3>
          <p>{mode === 'cpuVsPlayer' ? `${playerSymbol === 'X' ? cpuWins : player1Wins}` : `${playerSymbol === 'X' ? player2Wins : player1Wins}`}</p>
        </div>
      </div>

      {showResultModal && (
        <Modal
          winner={winner}
          winningSymbol={winningSymbol}
          onClose={closeResultModal}
          onExit={onExit}
          mode={mode}
          buttonOrder="exitFirst"
        />
      )}

      {showRestartModal && (
        <RestartModal
          onRestart={handleRestart}
          onCancel={onExit}
          buttonOrder="exitFirst"
        />
      )}
    </div>
  );
};

export default Game;
