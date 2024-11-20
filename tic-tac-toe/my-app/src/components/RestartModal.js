import React from 'react';
import '../Modal.css'; // 모달 스타일을 위한 CSS 파일 임포트

const RestartModal = ({ onRestart, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>RESTART GAME</h2>
        <p>다시 시작하시겠습니까?</p>
        <button onClick={onCancel}>NO, CANCEL</button>
        <button onClick={onRestart}>YES, RESTART</button>
      </div>
    </div>
  );
};

export default RestartModal;
