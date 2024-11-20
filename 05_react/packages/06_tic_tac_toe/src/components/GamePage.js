import React, { useState, useEffect } from 'react';
import Board from './Board';
import Modal from './Modal';

function GamePage({ gameMode, playerSymbol }) {
  const [board, setBoard] = useState(Array(9).fill(null)); // 초기화된 게임판 상태
  const [currentTurn, setCurrentTurn] = useState('X'); // X가 항상 첫 턴
  const [scores, setScores] = useState({ X: 0, TIES: 0, O: 0 }); // X, O, 무승부 점수
  const [gameResult, setGameResult] = useState(null); // 게임 결과
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const computerSymbol = playerSymbol === 'X' ? 'O' : 'X'; // 컴퓨터의 기호

  // 로컬 스토리지에서 점수 가져오기
  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('ticTacToeScores')) || { X: 0, TIES: 0, O: 0 };
    setScores(storedScores);
  }, []);

  // 점수 변경 시 로컬 스토리지 업데이트
  useEffect(() => {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
  }, [scores]);

  const handleGameEnd = (result) => {
    // 게임 결과에 따라 점수 업데이트
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

  // 게임판 초기화 함수 (공통 기능)
  const resetBoard = () => {
    setBoard([...Array(9).fill(null)]); // 게임판 상태를 빈 상태로 강제 초기화
    setCurrentTurn('X'); // 첫 번째 턴을 항상 'X'로 설정
  };

  // 새로고침 버튼 기능
  const handleRefresh = () => {
    resetBoard(); // 게임판 초기화
    setGameResult(null); // 게임 결과 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  // NEXT ROUND 버튼 기능
  const handleNextRound = () => {
    handleRefresh(); // 게임판 초기화와 동일한 동작
  };

  const quitGame = () => {
    // 로컬 스토리지 및 상태 초기화
    localStorage.removeItem('ticTacToeScores');
    window.location.reload(); // 게임 시작 페이지로 이동
  };

  // 점수판 라벨 설정
  const scoreLabel = gameMode === 'PLAYER'
    ? { left: 'X (P1)', center: 'TIES', right: 'O (P2)' }
    : { left: playerSymbol === 'X' ? 'X (YOU)' : 'O (YOU)', center: 'TIES', right: computerSymbol === 'X' ? 'X (CPU)' : 'O (CPU)' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>{currentTurn} Turn</h2>
        <button onClick={handleRefresh}>새로고침</button>
      </div>
      <Board
        board={board} // 게임판 상태 전달
        setBoard={setBoard} // 상태 변경 함수 전달
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
        onGameEnd={handleGameEnd}
        gameMode={gameMode}
        playerSymbol={playerSymbol}
        computerSymbol={computerSymbol}
      />
      {/* 점수판 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div>
          <h3>{scoreLabel.left}</h3>
          <p>{scores.X}</p>
        </div>
        <div>
          <h3>{scoreLabel.center}</h3>
          <p>{scores.TIES}</p>
        </div>
        <div>
          <h3>{scoreLabel.right}</h3>
          <p>{scores.O}</p>
        </div>
      </div>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        result={gameResult}
        onClose={quitGame}
        onNextRound={handleNextRound} // NEXT ROUND 시 호출
      />
    </div>
  );
}

export default GamePage;
