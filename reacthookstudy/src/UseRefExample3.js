import {useState, useEffect, useRef} from 'react';

function UseRefExample3(){

    //useref 3
    const [count, setCount] = useState(1);
    const renderCount = useRef(1);
    // const [renderCount, setRenderCount] = useState(1); //오류코드임 사용 ㄴㄴ해


    //문제코드임 사용 노노
    // useEffect(()=>{
    //   console.log('렌더링');
    //   setRenderCount(renderCount +1);
    // });

    useEffect(()=>{
        renderCount.current = renderCount.current +1;
        console.log('렌더링 수: ', renderCount.current);
    });

    return(

    //useref 3
    <div>
        <p>Count: {count}</p>
        <button onClick={()=> setCount(count +1)}>올려</button>
    </div>

    );
}

export default UseRefExample3;