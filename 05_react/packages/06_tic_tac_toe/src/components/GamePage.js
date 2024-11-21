import React, { useState, useEffect } from 'react';
import Board from './Board';
import Modal from './Modal';
import logo from '../assets/logo.svg';
import resetIcon from '../assets/Reset.svg';
import BasicCross from '../assets/Cross.svg';
import BasicCircle from '../assets/Circle.svg';

function GamePage({ gameMode, playerSymbol }) {
  const [board, setBoard] = useState(Array(9).fill(null)); // 초기화된 게임판 상태
  const [currentTurn, setCurrentTurn] = useState('X'); // X가 항상 첫 턴
  const [scores, setScores] = useState({ X: 0, TIES: 0, O: 0 }); // X, O, 무승부 점수
  const [gameResult, setGameResult] = useState(null); // 게임 결과
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const computerSymbol = playerSymbol === 'X' ? 'O' : 'X'; // 컴퓨터의 기호

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('ticTacToeScores')) || { X: 0, TIES: 0, O: 0 };
    setScores(storedScores);
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
  }, [scores]);

  const handleGameEnd = (result) => {
    if (result === 'DRAW') {
      setScores((prev) => ({ ...prev, TIES: prev.TIES + 1 }));
    } else {
      setScores((prev) => ({
        ...prev,
        [result]: prev[result] + 1,
      }));
    }
    setGameResult(result); // 결과 저장
    setIsModalOpen(true); // 모달 열기
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null)); // 게임판 초기화
    setCurrentTurn('X'); // 첫 번째 턴으로 초기화
    setGameResult(null); // 결과 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  const handleNextRound = () => {
    resetBoard();
  };

  const quitGame = () => {
    localStorage.removeItem('ticTacToeScores');
    window.location.reload();
  };

  const scoreLabel = gameMode === 'PLAYER'
    ? { left: 'X (P1)', center: 'TIES', right: 'O (P2)' }
    : { left: playerSymbol === 'X' ? 'X (YOU)' : 'O (YOU)', center: 'TIES', right: computerSymbol === 'X' ? 'X (CPU)' : 'O (CPU)' };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1A2A33',
        padding: '20px',
        position: 'relative',
      }}
    >
      {/* 로고 */}
      <img
        src={logo}
        alt="틱택토 로고"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
        }}
      />
      {/* 새로고침 버튼 */}
      <img
        src={resetIcon}
        alt="새로고침"
        onClick={resetBoard}
        style={{
          marginBottom: '20px',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
        }}
      />
      {/* 턴 표시 박스 */}
      <div
        style={{
          width: '140px',
          height: '52px',
          backgroundColor: '#1F3641',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          flexShrink: 0,
          marginBottom: '20px',
        }}
      >
        <img
          src={currentTurn === 'X' ? BasicCross : BasicCircle}
          alt={`${currentTurn} TURN`}
          style={{
            width: '24px',
            height: '24px',
            marginRight: '8px',
          }}
        />
        <span
          style={{
            fontSize: '18px',
            color: '#A8BFC9',
            fontWeight: 'bold',
          }}
        >
          TURN
        </span>
      </div>
      {/* 게임 보드 */}
      <Board
        board={board}
        setBoard={setBoard}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
        onGameEnd={handleGameEnd}
        gameMode={gameMode}
        playerSymbol={playerSymbol}
        computerSymbol={computerSymbol}
      />
      {/* 점수판 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', gap: '10px' }}>
        {/* X 정보 박스 */}
        <div
          style={{
            width: '140px',
            height: '72px',
            backgroundColor: '#31C3BD',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#1A2A33',
              margin: '0',
              fontWeight: 'bold',
            }}
          >
            {scoreLabel.left}
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#1A2A33',
              margin: '0',
              fontWeight: 'bold',
            }}
          >
            {scores.X}
          </p>
        </div>

        {/* TIES 정보 박스 */}
        <div
          style={{
            width: '140px',
            height: '72px',
            backgroundColor: '#A8BFC9',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#1A2A33',
              margin: '0',
              fontWeight: 'bold',
            }}
          >
            TIES
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#1A2A33',
              margin: '0',
              fontWeight: 'bold',
            }}
          >
            {scores.TIES}
          </p>
        </div>

        {/* O 정보 박스 */}
        <div
          style={{
            width: '140px',
            height: '72px',
            backgroundColor: '#F2B137',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#1A2A33',
              margin: '0',
              fontWeight: 'bold',
            }}
          >
            {scoreLabel.right}
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#1A2A33',
              margin: '0',
              fontWeight: 'bold',
            }}
          >
            {scores.O}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        result={gameResult}
        onClose={quitGame}
        onNextRound={handleNextRound}
      />
    </div>
  );
}

export default GamePage;
