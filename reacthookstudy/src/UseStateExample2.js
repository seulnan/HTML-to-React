import './App.css';
import { useState } from 'react';

const heavyWork = () => {
  console.log('엄청 무거운 작업');
  return ['홍길동', '김민수'];
};

function UseStateExample2() {

  const [names, setName] = useState(() => {
  return heavyWork();
});
const [input, setInput] = useState("");

const handleInputChange = (e) => {
  setInput(e.target.value);
};

const handleUpload = () => {
  setName((prevState) => {
      console.log('이전 state: ', prevState)
      return [input, ...prevState];
  });
  setInput("");
};

console.log(input);

return (
<div className="App">
<input type="text" value={input} onChange={handleInputChange}/>
<button onClick={handleUpload}>Upload</button>
{names.map((name) => {
  return <p>{name}</p>
})}
</div>
);
}

export default UseStateExample2;
