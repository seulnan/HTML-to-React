import React from 'react';

function Modal({ isOpen, onClose, onNextRound, result }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2>{result === 'DRAW' ? '무승부!' : `${result} 승리!`}</h2>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onNextRound} // NEXT ROUND 호출
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            NEXT ROUND
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            QUIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
