import React, { useState } from 'react';

const Settings = ({ setMode, setPlayerSymbol }) => {
  const [symbol, setSymbol] = useState('X'); // 기본값은 'X'

  const handleStartGame = (mode) => {
    setPlayerSymbol(symbol);
    setMode(mode);
  };

  return (
    <div>
      <h2>게임 모드 선택</h2>
      <button onClick={() => handleStartGame('playerVsPlayer')}>사람 vs 사람</button>
      <button onClick={() => handleStartGame('cpuVsPlayer')}>CPU vs 사람</button>
      
      <h3>기호 선택</h3>
      <button onClick={() => setSymbol('X')}>X</button>
      <button onClick={() => setSymbol('O')}>O</button>
      
      <p>선택한 기호: {symbol}</p>
    </div>
  );
};

export default Settings;
