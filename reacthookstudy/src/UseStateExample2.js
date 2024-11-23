import {useState} from 'react';

//useState 2
const heavyWork =()=>{
  console.log('엄청무거운 작업!!');
  return['홍길동','김민수']
}

function UseStateExample2(){
    //useState 2
    const [names, setNames] = useState(()=>{return heavyWork();});
    const [input, setInput] = useState('');

    const handleInputChange = (e) =>{
        setInput(e.target.value);
    };

    const handleUpload = ()=>{
        setNames((prevState)=>{
        console.log('이전 state: ', prevState);
        return [input, ...prevState];
        });
    }

    return(
    //useState 2
        <div>
        <input type="text" value={input} onChange = {handleInputChange}/>
        <button onClick={handleUpload}>Upload</button>
        {names.map((name, idx)=>{
            return <p key={idx}>{name}</p>;
        })}
        </div>
    );
}

export default UseStateExample2;