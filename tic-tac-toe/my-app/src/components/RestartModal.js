import React from 'react';
import '../Modal.css'; // 모달 스타일을 위한 CSS 파일 임포트

const RestartModal = ({ onRestart, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="restart-text">RESTART GAME?</span>

        {/* 버튼들을 감싸는 div로 가로 정렬 적용 */}
        <div className="button-container">
          <button className="cancel-rm" onClick={onCancel}>NO, CANCEL</button>
          <button className="restart" onClick={onRestart}>YES, RESTART</button>
        </div>
      </div>
    </div>
  );
};

export default RestartModal;
