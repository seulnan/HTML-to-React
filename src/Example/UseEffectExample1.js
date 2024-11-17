import React, { useState, useEffect } from "react";

function UseEffectExample1() {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('')

    const handleCountUpdate = () => {
        setCount(count + 1);
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

/*
    // 랜더링이 될 때마다 실행
    useEffect(() => {
        console.log('랜더링이 될 때마다 실행');
    });

    // 마운팅 + count가 변경될 때만 실행
    useEffect(() => {
        console.log('count 변화')
    }, [count])

    // 마운팅 + name가 변경될 때만 실행
    useEffect(() => {
        console.log('name 변화')
    }, [name])
*/
    
    // 마운팅될 때만 실행
    useEffect(() => {
        console.log('마운팅될 때만 실행')
    }, [])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleCountUpdate}>Update</button>
            <span>count : {count}</span>
            <input type="text" value={name} onChange={handleInputChange}/>
            <span>name: {name}</span>
        </div>
    );
}

export default UseEffectExample1;