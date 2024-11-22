import React, { useState } from 'react';
import xImage from '../assets/image/icon_x.png'; // X 이미지 경로
import oImage from '../assets/image/icon_o.png'; // O 이미지 경로
import xHoverImage from '../assets/image/hover_x.png'; // X hover 이미지 경로
import oHoverImage from '../assets/image/hover_o.png'; // O hover 이미지 경로

const Board = ({ squares, onClick, currentPlayer }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="board">
      {squares.map((square, index) => (
        <div
          key={index}
          className="square"
          onClick={() => onClick(index)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* X 또는 O가 있는 경우 해당 심볼을 표시 */}
          {square === 'X' ? <img src={xImage} alt="X" className="symbol" /> : null}
          {square === 'O' ? <img src={oImage} alt="O" className="symbol" /> : null}
          {/* 빈 칸 hover 상태에서 이미지 표시 (현재 플레이어에 따라 다름) */}
          {square === null && hoverIndex === index ? (
            <img
              src={currentPlayer === 'X' ? xHoverImage : oHoverImage}
              alt="Hover"
              className="hover-symbol"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Board;
