import React, {useRef, useState} from 'react';

const useRef1=()=>{
  const [count, setCount]=useState(0);
  const countRef=useRef(0);

  console.log(countRef);

  console.log('렌더링...');

  const increaseCountState=()=>{
    setCount(count+1);
  };

  const increaseCountRef=()=>{
    countRef.current=countRef.current+1;
    console.log('Ref:', countRef.current);
  };

  return(
    <div>
      <span>State: {count}</span>
      <p>Ref:{countRef.current}</p>
      <button onClick={increaseCountState}>State 올려</button>
      <button onClick={increaseCountRef}>Ref 올려</button>
    </div>
  );
};

export default useRef1;