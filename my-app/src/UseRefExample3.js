import React, { useEffect, useRef } from 'react';

const UseRefExample3 = () => {
    const renderCount = useRef(1);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        console.log('랜더링 수: ', renderCount.current);
    }, []); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행

    return (
        <div>
            <p>Render count: {renderCount.current}</p>
        </div>
    );
};

export default UseRefExample3;
