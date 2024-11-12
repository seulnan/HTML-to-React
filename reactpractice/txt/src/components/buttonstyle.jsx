import React, { useState } from 'react';
import Button from '../styles/button.js';

function ButtonStyle() {
  // primary 상태를 true 또는 false로 변경하는 state
  const [isPrimary, setIsPrimary] = useState(true);

  // 버튼을 클릭할 때 primary 상태를 토글하는 함수
  const togglePrimary = () => {
    setIsPrimary((prev) => !prev); // 현재 값을 반전시켜 토글
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <Button primary={isPrimary}>Toggle Primary Button</Button>
      <Button onClick={togglePrimary}>
        {isPrimary ? 'Set Secondary' : 'Set Primary'}
      </Button>
    </div>
  );
}

export { ButtonStyle };
