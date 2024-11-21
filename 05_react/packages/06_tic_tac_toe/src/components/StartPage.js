import React, { useState } from 'react';

function StartPage({ startGame }) {
  const [symbol, setSymbol] = useState('X'); // 기본 선택은 X

  const handleGameStart = (mode) => {
    startGame(mode, symbol); // 선택된 심볼과 함께 게임 시작
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1A2A33', // 배경색 설정
      }}
    >
      <h1 style={{ color: '#fff', fontSize: '36px', marginBottom: '40px' }}>
        틱택토 게임
      </h1>
      {/* O/X 선택 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <button
          onClick={() => setSymbol('X')}
          style={{
            padding: '10px 20px',
            fontSize: '20px',
            backgroundColor: symbol === 'X' ? '#31C3BD' : '#A8BFC9',
            color: '#1A2A33',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          X
        </button>
        <button
          onClick={() => setSymbol('O')}
          style={{
            padding: '10px 20px',
            fontSize: '20px',
            backgroundColor: symbol === 'O' ? '#F2B137' : '#A8BFC9',
            color: '#1A2A33',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          O
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* 컴퓨터와의 대결 */}
        <button
          onClick={() => handleGameStart('COMPUTER')}
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            color: '#1A2A33',
            backgroundColor: '#31C3BD',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          NEW GAME (VS CPU)
        </button>
        {/* 플레이어 간 대결 */}
        <button
          onClick={() => handleGameStart('PLAYER')}
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            color: '#1A2A33',
            backgroundColor: '#F2B137',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  );
}

export default StartPage;
