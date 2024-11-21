import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import BasicCross from '../assets/Basic_Cross.svg'; 
import XButtonHover from '../assets/X_button_hover.svg';
import OButton from '../assets/O_button.svg';

function StartPage({ startGame }) {
  const [symbol, setSymbol] = useState('X'); // 기본 선택은 X
  const [isXHovered, setIsXHovered] = useState(false); // X 버튼 hover 상태

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
      {/* 로고 */}
      <img src={logo} alt="틱택토 로고" style={{ marginBottom: '40px' }} />
      {/* 선택 박스 */}
      <div
        style={{
          width: '460px',
          height: '205px',
          backgroundColor: '#1F3641',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 20px',
          boxSizing: 'border-box',
          marginBottom: '40px',
        }}
      >
        {/* 상단 텍스트 */}
        <p style={{ color: '#A8BFC9', fontSize: '16px', margin: '0' }}>
          PICK PLAYER 1’S MARK
        </p>
        {/* O와 X 선택 박스 */}
        <div
          style={{
            width: '412px',
            height: '72px',
            backgroundColor: '#1A2A33',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            gap: '0px',
            alignItems: 'center',
            margin: '20px 0',
          }}
        >
          {/* X 버튼 */}
          <button
            onClick={() => setSymbol('X')}
            onMouseEnter={() => setIsXHovered(true)}
            onMouseLeave={() => setIsXHovered(false)}
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: symbol === 'X' ? '#A8BFC9' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background-color 0.3s',
              padding: '0px',
            }}
          >
            <img
              src={isXHovered ? XButtonHover : BasicCross}
              alt="X"
              style={{ width: '198px', height: '54px'}}
            />
          </button>
          {/* O 버튼 */}
          <button
            onClick={() => setSymbol('O')}
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: symbol === 'O' ? '#A8BFC9' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background-color 0.3s',
              padding: '0px',
            }}
          >
            <img src={OButton} alt="O" style={{ width: '198px', height: '54px'}} />
          </button>
        </div>
        {/* 하단 텍스트 */}
        <p style={{ color: '#A8BFC9', fontSize: '14px', margin: '0' }}>
          REMEMBER : X GOES FIRST
        </p>
      </div>
      {/* 게임 시작 버튼 */}
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
            padding: '20px 128px',
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
