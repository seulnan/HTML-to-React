import React, { useState } from "react";

const heavyWork = () => {
    console.log('엄청 무거운 작업');
    return ['홍기동', '김민수'];
};

function UseStateExample2() {
    // const [names, setNames] = useState(["홍길동", "김민수"]);
    // const [names, setNames] = useState(heavyWork()); -> 이렇게 하면 heavyWork 함수가 계속 호출됨
    const [names, setNames] = useState(() => {
        return heavyWork();
    });
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleUpload = () => {
        setNames((prevState) => {
            console.log('이전 state : ',prevState);
            return([input, ...prevState])
        })
    };
    console.log(input);

    return (
        <div>
            <input type="text" value={input} onChange={handleInputChange} />
            <input type="text" />
            <button onClick={handleUpload}>Upload</button>
            {names.map((name, idx) => {
                return <p key={idx}>{name}</p>
            })}
        </div>
    )
}

export default UseStateExample2;