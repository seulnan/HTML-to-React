import React from 'react';
import OImage from '../assets/image/icon_o.png';
import XImage from '../assets/image/icon_x.png';
import '../Modal.css'; // 모달 스타일을 위한 CSS 파일 임포트

const Modal = ({ winner, winningSymbol, onClose, onExit, mode }) => {
  const getWinner = () => {
    if (mode === 'cpuVsPlayer') {
      return winner === 'CPU' ? 'You Lose!' : 'You Win!';
    }
    else if (winner === null){
      return null;
    }
    else {
      return `${winner} Wins!`; // Player 1 또는 Player 2와 기호 표시
    }
  };

  const getWinnersymbol = () => {
    if (winner === null) {
      return "ROUND TIED";
    }

    return winningSymbol; // Player 1 또는 Player 2의 심볼
  };

  const getWinnersymbolimg = () => {
    if (getWinnersymbol() === 'X') {
      return XImage; // X 심볼 이미지 반환
    } else if (getWinnersymbol() === 'O') {
      return OImage; // O 심볼 이미지 반환
    } // 타이일 경우 이미지 없음
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {winner ===null}:
          <span className="winner-subtext">{getWinner()}</span> {/* 승자 메시지 표시 */}

        <div className="winner-symbol-container">
          {winner === null ? (
            <span className="restart-text">ROUND TIED</span> // 비겼을 때 메시지 표시
          ) : (
            <>
              <img src={getWinnersymbolimg()} alt="Winner Symbol" />
              <span className={getWinnersymbol() === 'X' ? 'winner-title-text-X' : 'winner-title-text-O'}>
                TAKES THE ROUND
              </span>
            </>
          )}
        </div>

        {/* 버튼 컨테이너 추가하여 버튼들을 가로로 나열 */}
        <div className="button-container">
          <button className="cancel" onClick={onExit}>QUIT</button> {/* 나가기 버튼 */}
          <button className="next" onClick={onClose}>NEXT ROUND</button> {/* 다음 라운드 버튼 */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
