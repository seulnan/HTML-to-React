import React, { useState } from 'react';
import './Settings.css'; // CSS 파일 임포트
import myImage from '../assets/image/Menu_ox.png';

const Settings = ({ setMode, setPlayerSymbol }) => {
  const [symbol, setSymbol] = useState('X'); // 기본값은 'X'

  const handleStartGame = (mode) => {
    setPlayerSymbol(symbol);
    setMode(mode);
  };

  return (
    <div>
      <div class="icon-container">
        <img src= {myImage} alt="Icon" class="icon" />
    </div>
    <div className="settings-container">
      
      <div className="symbol-selection">
      <p className="selected-symbol">PICK PLAYER 1’S MARK</p>
        <div className="symbol-toggle-container">
          <button
            onClick={() => setSymbol('X')} 
            className={`toggle-symbol-button ${symbol === 'X' ? 'active' : ''}`}
          >
            X
          </button>
          <button 
            onClick={() => setSymbol('O')} 
            className={`toggle-symbol-button ${symbol === 'O' ? 'active' : ''}`}
          >
            O
          </button>
        </div>
        <p className="selected-symbol">REMEMBER : X GOES FIRST</p>
      </div>

      <button 
        onClick={() => handleStartGame('cpuVsPlayer')} 
        className="game-button cpu-button"
      >
        NEW GAME (VS CPU)
      </button>
      <button 
        onClick={() => handleStartGame('playerVsPlayer')} 
        className="game-button player-button"
      >
        NEW GAME (VS PLAYER)
      </button>
    </div>
    </div>
  );
};

export default Settings;
