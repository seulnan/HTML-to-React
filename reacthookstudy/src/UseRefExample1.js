import {useState, useRef} from 'react';

function UseRefExample1(){
    
    //useref 1
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    const increaseCountState = () => {
        setCount(count + 1);
    };

    console.log('렌더링');

    const increaseCountRef =()=>{
        countRef.current = countRef.current + 1;
        console.log('Ref: ', countRef.current);
    };

    return(

    //useref 1
    <div>
        <p>State: {count}</p>
        <p>Ref : {countRef.current}</p>
        <button onClick ={increaseCountState}>State 올려</button>
        <button onClick={increaseCountRef}>Ref 올려</button>
    </div>

    );
}

export default UseRefExample1;