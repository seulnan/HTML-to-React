import {useState} from 'react';
import Timer from './component/Timer';

function useEffectExample2(){

    //useEffect 2
    const [showTimer, setShowTimer] = useState(false);

    return(
    //useEffect 2
    <div>
        {showTimer && <Timer />}
        <button onClick={()=> setShowTimer(!showTimer)}>Toggle Timer</button>
    </div>
    );
}

export default useEffectExample2;