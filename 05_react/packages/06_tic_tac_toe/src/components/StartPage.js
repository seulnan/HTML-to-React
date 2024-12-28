import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import OButton from '../assets/O_button.svg'; // 원본 이미지

function StartPage({ startGame }) {
  const [symbol, setSymbol] = useState('X'); // 기본 선택은 X
  const [isOReversed, setIsOReversed] = useState(false); // O 버튼의 반전 상태

  const handleGameStart = (mode) => {
    startGame(mode, symbol); // 선택된 심볼과 함께 게임 시작
  };

  const toggleOButton = () => {
    setSymbol('O');
    setIsOReversed(true); // O 버튼을 반전된 상태로 변경
  };

  const resetToX = () => {
    setSymbol('X');
    setIsOReversed(false); // O 버튼을 원본 상태로 복구
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
        <p style={{ color: '#A8BFC9', fontSize: '20px', margin: '0' }}>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
          }}
        >
          {/* X 버튼 */}
          <button
            onClick={resetToX}
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
              padding: '0px',
              transition: 'background-color 0.3s',
            }}
          >
            <svg
              width="198"
              height="54"
              viewBox="0 0 198 54"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                fill: symbol === 'X' ? '#1A2A33' : '#A8BFC9',
                transition: 'fill 0.3s',
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M114.557 16.2897L109.71 11.4431C109.12 10.8523 108.162 10.8523 107.571 11.4431L99 20.014L90.429 11.4431C89.8383 10.8523 88.8805 10.8523 88.2897 11.4431L83.4431 16.2897C82.8523 16.8805 82.8523 17.8383 83.4431 18.429L92.014 27L83.4431 35.571C82.8523 36.1617 82.8523 37.1195 83.4431 37.7103L88.2897 42.5569C88.8805 43.1477 89.8383 43.1477 90.429 42.5569L99 33.986L107.571 42.5569C108.162 43.1477 109.12 43.1477 109.71 42.5569L114.557 37.7103C115.148 37.1195 115.148 36.1617 114.557 35.571L105.986 27L114.557 18.429C115.148 17.8383 115.148 16.8805 114.557 16.2897Z"
              />
            </svg>
          </button>

          {/* O 버튼 */}
<button
  onClick={toggleOButton}
  style={{
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
    transition: 'background-color 0.3s',
  }}
>
  <img
    src={OButton}
    alt="O"
    style={{
      width: '198px',
      height: '54px',
      filter: isOReversed ? 'invert(100%) hue-rotate(180deg)' : 'none',
      transition: 'filter 0.3s',
    }}
  />
</button>

        </div>
        {/* 하단 텍스트 */}
        <p style={{ color: '#A8BFC9', fontSize: '18px', margin: '0' }}>
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
            padding: '20px 132px',
            fontSize: '20px',
            color: '#1A2A33',
            backgroundColor: '#31C3BD',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: '700',
            fontStyle: 'normal',
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
            fontFamily: 'Outfit, sans-serif',
            fontWeight: '700',
            fontStyle: 'normal',
          }}
        >
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  );
}

export default StartPage;
