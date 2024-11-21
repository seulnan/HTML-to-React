import React from 'react';

function Modal({ isOpen, onClose, onNextRound, result, gameMode, winner, playerSymbol }) {
  if (!isOpen) return null;

  // 상단 텍스트 결정
  const getHeaderText = () => {
    if (result === 'DRAW') return null; // 무승부일 때 상단 텍스트 없음

    // 컴퓨터와 대결인 경우
    if (gameMode === 'COMPUTER') {
      return winner === playerSymbol ? 'YOU WON!' : 'OH NO, YOU LOST…';
    }

    // 플레이어 간 대결인 경우
    if (gameMode === 'PLAYER') {
      return winner === playerSymbol ? 'PLAYER 1 WINS!' : 'PLAYER 2 WINS!';
    }

    return null;
  };

  // 중앙 텍스트 색상 결정
  const getCenterTextStyle = () => {
    if (result === 'DRAW') return { color: '#A8BFC9' }; // 무승부 텍스트 색상
    return { color: winner === 'X' ? '#31C3BD' : '#F2B137' }; // X 또는 O 승리 색상
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '1440px',
          height: '266px',
          flexShrink: 0,
          backgroundColor: '#1F3641',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* 상단 텍스트 */}
        {result !== 'DRAW' && (
          <h2
            style={{
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
            }}
          >
            {getHeaderText()}
          </h2>
        )}

        {/* 중앙 텍스트 */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: 0,
            ...getCenterTextStyle(),
          }}
        >
          {result === 'DRAW' ? 'ROUND TIED' : `${winner} TAKES THE ROUND`}
        </h1>

        {/* 버튼 섹션 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '40px',
            gap: '20px',
          }}
        >
          {/* QUIT 버튼 */}
          <button
            onClick={onClose}
            style={{
              width: '76px',
              height: '52px',
              flexShrink: 0,
              backgroundColor: '#A8BFC9',
              color: '#1A2A33',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            QUIT
          </button>

          {/* NEXT ROUND 버튼 */}
          <button
            onClick={onNextRound}
            style={{
              width: '146px',
              height: '52px',
              flexShrink: 0,
              backgroundColor: '#F2B137',
              color: '#1A2A33',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            NEXT ROUND
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
