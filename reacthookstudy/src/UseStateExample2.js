import {useState} from 'react';


const heavyWork =()=>{
  console.log('정말 무거운 작업');
  return['김난슬','편유나']
}


function UseStateEx2(){

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

        <div>
        <input type="text" value={input} onChange = {handleInputChange}/>
        <button onClick={handleUpload}>Upload</button>
        {names.map((name, idx)=>{
            return <p key={idx}>{name}</p>;
        })}
        </div>
    );
}

export default UseStateEx2;