import React, { useState, useEffect } from 'react';

function App() {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('');
    
    const handleCountUpdate = () => {
        setCount(count + 1);
    };

    const handleInputUpdate = (e) => {
        setName(e.target.value);
    };

    // Renders on every re-render
    useEffect(() => {
        console.log('렌더링');
    });

    // Runs on mount + only when 'count' changes
    useEffect(() => {
        console.log('count 변화');
    }, [count]);

    // Runs on mount + only when 'name' changes
    useEffect(() => {
        console.log('name이 변화');
    }, [name]);

    // Runs only once on mount
    useEffect(() => {
        console.log('마운팅');
    }, []);

    return (
        <div>
            <button onClick={handleCountUpdate}>Update</button>
            <span>count: {count}</span>
            <input type="text" value={name} onChange={handleInputUpdate}/>
            <span>name: {name}</span>
        </div>
    );
}

export default App;