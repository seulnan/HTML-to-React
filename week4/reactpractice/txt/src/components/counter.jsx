import React, { useState } from 'react';

// state는 컴포넌트 내부 상태를 저장하는 객체(그냥 말그대로 데이터의 값, 상태를 담음)
// useState훅을 이용해 설정 후 변경될때마다 컴포넌트가 다시 렌더링됨
// count라는 상태변수설정, 상태변경함수 setCount를 통해 값을 업데이트

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export { Counter };
