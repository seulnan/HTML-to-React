import React, { useState } from 'react';

function StartPage({ startGame }) {
  const [symbol, setSymbol] = useState('X');
  const [mode, setMode] = useState('PLAYER');

  return (
    <div>
      <h1>틱택토 게임</h1>
      <div>
        <h2>플레이어 심볼 선택</h2>
        <button onClick={() => setSymbol('X')} style={{ background: symbol === 'X' ? '#ddd' : '' }}>X</button>
        <button onClick={() => setSymbol('O')} style={{ background: symbol === 'O' ? '#ddd' : '' }}>O</button>
      </div>
      <div>
        <h2>대결 모드 선택</h2>
        <button onClick={() => setMode('PLAYER')} style={{ background: mode === 'PLAYER' ? '#ddd' : '' }}>플레이어</button>
        <button onClick={() => setMode('COMPUTER')} style={{ background: mode === 'COMPUTER' ? '#ddd' : '' }}>컴퓨터</button>
      </div>
      <button onClick={() => startGame(mode, symbol)}>게임 시작</button>
    </div>
  );
}

export default StartPage;