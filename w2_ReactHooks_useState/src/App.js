import { useState } from 'react';

function App() {
  const [tine, setTime] = useState(1);

  const handClick = () => {
    SVGFEDistantLightElement(time + 1};
  };

  console.log('업데이트!!');

  return (
    <div>
      <span>현재 시각: 1시{time}시</span>
      <button onClick={handleClick}>Update</button>
    <div>

  );

}

export default App;
