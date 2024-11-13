import {useState, useEffect} from 'react';

function useEffectExample1(){

 
 
    const [count, setCount] = useState(1);
    const [name, setName] = useState('');

    const handleCountUpdate = () => {
        setCount(count + 1);
    };

    const handleInputChange = (e)=>{
        setName(e.target.value);
    };

    useEffect(()=> {
        console.log('렌더링');
    });

    useEffect(()=> {
        console.log('count 변화');
    }, [count]);

    useEffect(()=> {
        console.log('name 변화');
    }, [name]);

    useEffect(()=> {
        console.log('마운팅');
    }, []);


    return(
  
    <div>
        <button onClick = {handleCountUpdate}>Update</button>
        <span>count: {count}</span>
        <input type ="text" value={name} onChange={handleInputChange} />
        <span>name: {name}</span>
    </div>
    );
}

export default useEffectExample1;