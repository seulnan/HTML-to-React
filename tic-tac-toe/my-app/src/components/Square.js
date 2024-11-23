import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value ? <img src={value} alt="symbol" /> : null}
    </button>
  );
};

export default Square;
