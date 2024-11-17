import React, { useState } from 'react';

function UseStateExample1() {
    const [time, setTime] = useState(1);

    const handleClick = () => {
        // setTime(time + 1);
        let newTime;
        if (time >= 12) {
            newTime = 1; 
        } else {
            newTime = time + 1;
        }
        setTime(newTime);
    };

    console.log('업데이트!!');

    return (
        <div>
            <span>현재 시각: {time}시</span>
            <button onClick={handleClick}>Update</button>
        </div>
    );
}

export default UseStateExample1;
