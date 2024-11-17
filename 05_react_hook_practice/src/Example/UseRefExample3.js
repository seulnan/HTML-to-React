import React, { useState, useRef, useEffect } from 'react';

const UseRefExample3 = () => {
    const [count, setCount] = useState(1);
    const [rederCount, setRenderCount] = useState(1);
    const renderCount = useRef(1);

/* 무한 루프에 빠짐 -> 무한 랜더링
    useEffect(() => {
        console.log("랜더링...");
        setRenderCount(rederCount + 1);
    });
*/

    useEffect(() => {
        renderCount.current += 1;
        console.log('랜더링 수 : ', renderCount.current);
    });

    return (
        <div>
            <p>state : {count}</p>
            <button onClick={() => setCount(count + 1)}>올려</button>
        </div>
    )
};

export default UseRefExample3;