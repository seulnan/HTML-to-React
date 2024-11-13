import {useState} from 'react';
import Timer from './component/Timer';


function useEffectExample2(){

  
    const [showTimer, setShowTimer] = useState(false);


    return(
  
    <div>
        {showTimer && <Timer />}
        <button onClick={()=> setShowTimer(!showTimer)}>Toggle Timer</button>
    </div>
    );
}

export default useEffectExample2;