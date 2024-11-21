import React from 'react';
import xImage from '../assets/image/icon_x.png';  // X 이미지 경로
import oImage from '../assets/image/icon_o.png';  // O 이미지 경로

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <div 
          key={index} 
          className="square" 
          onClick={() => onClick(index)}
        >
          {/* X일 때 xImage, O일 때 oImage를 표시 */}
          {square === 'X' ? <img src={xImage} alt="X" className="symbol" /> : null}
          {square === 'O' ? <img src={oImage} alt="O" className="symbol" /> : null}
        </div>
      ))}
    </div>
  );
};

export default Board;
