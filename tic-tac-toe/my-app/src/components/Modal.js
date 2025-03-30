import React from 'react';
import OImage from '../assets/image/icon_o.png';
import XImage from '../assets/image/icon_x.png';
import '../Modal.css'; // 모달 스타일을 위한 CSS 파일 임포트

const Modal = ({ winner, winningSymbol, onClose, onExit, mode }) => {
  // 승자 메시지를 반환하는 함수
  const getWinnerMessage = () => {
    if (winner === null) {
      return null; // 무승부일 때 상단 메시지를 표시하지 않음
    }

    if (mode === 'cpuVsPlayer') {
      return winner === 'CPU' ? 'OH NO, YOU LOST…' : 'You Win!';
    }

    return `${winner} Wins!`; // Player 1 또는 Player 2와 기호 표시
  };

  // 승리한 심볼 이미지를 반환하는 함수
  const getWinnerSymbolImage = () => {
    if (winningSymbol === 'X') {
      return XImage;
    } else if (winningSymbol === 'O') {
      return OImage;
    }
    return null;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 상단 메시지: 승자가 있을 때만 표시 */}
        {getWinnerMessage() && <span className="winner-subtext">{getWinnerMessage()}</span>}

        <div className="winner-symbol-container">
          {winner === null ? (
            <span className="restart-text">ROUND TIED</span> // 무승부일 때 하단에만 표시
          ) : (
            <>
              <img src={getWinnerSymbolImage()} alt="Winner Symbol" />
              <span className={winningSymbol === 'X' ? 'winner-title-text-X' : 'winner-title-text-O'}>
                TAKES THE ROUND
              </span>
            </>
          )}
        </div>

        {/* 버튼 컨테이너 */}
        <div className="button-container">
          <button className="cancel" onClick={onExit}>QUIT</button>
          <button className="next" onClick={onClose}>NEXT ROUND</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
