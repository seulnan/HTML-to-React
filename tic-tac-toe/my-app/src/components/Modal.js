import React from 'react';
import '../Modal.css'; // 모달 스타일을 위한 CSS 파일 임포트

const Modal = ({ winner, winningSymbol, onClose, onExit, mode }) => {
  const getMessage = () => {
    if (mode === 'cpuVsPlayer') {
      return winner === 'CPU' ? `You Lose! ${winningSymbol}가 이겼습니다` : `You Win! ${winningSymbol}가 이겼습니다!`;
    } else {
      return `${winner} Win! ${winningSymbol}가 이겼습니다`; // Player 1 또는 Player 2와 기호 표시
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{getMessage()}</h2> {/* 승자 메시지 표시 */}
        <button onClick={onExit}>나가기</button> {/* 나가기 버튼을 첫 번째로 표시 */}
        <button onClick={onClose}>NEXT ROUND</button>
      </div>
    </div>
  );
};

export default Modal;
