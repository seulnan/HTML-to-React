import React from 'react';

const Status = ({ winner, xIsNext, isDraw }) => {
  if (winner) {
    return <div>승자는 {winner}입니다!</div>;
  } else if (isDraw) {
    return <div>비겼습니다!</div>;
  } else {
    return <div>{xIsNext ? 'X' : 'O'} TURN</div>;
  }
};

export default Status;
