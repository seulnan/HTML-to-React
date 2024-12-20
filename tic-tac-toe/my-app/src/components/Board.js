import React, { useState } from 'react';
import xImage from '../assets/image/icon_x.png';
import oImage from '../assets/image/icon_o.png';
import xHoverImage from '../assets/image/hover_x.png';
import oHoverImage from '../assets/image/hover_o.png';
import xOutlineImage from '../assets/image/icon-x-outline.png';
import oOutlineImage from '../assets/image/icon-o-outline.png';

const Board = ({ squares, onClick, currentPlayer, winningLine }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const isWinningSquare = (index) => winningLine && winningLine.includes(index);

  return (
    <div className="board">
      {squares.map((square, index) => (
        <div
          key={index}
          className="square"
          onClick={() => onClick(index)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          style={{
            backgroundColor: isWinningSquare(index) ? (square === 'X' ? '#65E9E4' : '#FFC860') : '',
          }}
        >
          {square === 'X' ? (
            <img src={isWinningSquare(index) ? xOutlineImage : xImage} alt="X" className="symbol" />
          ) : square === 'O' ? (
            <img src={isWinningSquare(index) ? oOutlineImage : oImage} alt="O" className="symbol" />
          ) : null}
          {square === null && hoverIndex === index ? (
            <img src={currentPlayer === 'X' ? xHoverImage : oHoverImage} alt="Hover" className="hover-symbol" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Board;
