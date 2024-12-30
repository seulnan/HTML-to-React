import React, { useState } from 'react';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';

function App() {
    const [gameMode, setGameMode] = useState(null); // 'PLAYER' or 'COMPUTER'
    const [playerSymbol, setPlayerSymbol] = useState(null); // 'X' or 'O'
    const [isGameStarted, setIsGameStarted] = useState(false);

    const startGame = (mode, symbol) => {
        setGameMode(mode);
        setPlayerSymbol(symbol);
        setIsGameStarted(true);
    };

    return (
        <div>
        {isGameStarted ? (
            <GamePage gameMode={gameMode} playerSymbol={playerSymbol} />
        ) : (
            <StartPage startGame={startGame} />
        )}
        </div>
    );
}

export default App;
