import React, { useState } from 'react';
import Game from './components/Game';
import Settings from './components/Settings.js';
import './styles.css'; // 스타일 파일 임포트

function App() {
  const [mode, setMode] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState('X'); // 플레이어 기호 상태

  const handleExit = () => {
    setMode(null); // 설정 화면으로 돌아가기
    setPlayerSymbol('X'); // 기본 기호로 초기화
  };

  return (
    <div>
      {mode === null ? (
        <Settings setMode={setMode} setPlayerSymbol={setPlayerSymbol} />
      ) : (
        <Game mode={mode} playerSymbol={playerSymbol} onExit={handleExit} />
      )}
    </div>
  );
}

export default App;
