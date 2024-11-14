import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UseEffectExample1 from './UseEffectExample1';
import UseEffectExample2 from './UseEffectExample2';
import UseRefExample1 from './UseRefExample1';
import UseRefExample2 from './UseRefExample2';
import UseRefExample3 from './UseRefExample3';
import UseStateExample1 from './UseStateExample1';
import UseStateExample2 from './UseStateExample2';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>React Hook Examples</h1>

        {/* Links only appear on the main page */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <Link to="/UseStateExample1" target="_blank">useState1</Link>
                </div>
                <div>
                  <Link to="/UseStateExample2" target="_blank">useState2</Link>
                </div>
                <div>
                  <Link to="/UseEffectExample1" target="_blank">useEffect1</Link>
                </div>
                <div>
                  <Link to="/UseEffectExample2" target="_blank">useEffect2</Link>
                </div>
                <div>
                  <Link to="/UseRefExample1" target="_blank">useRef1</Link>
                </div>
                <div>
                  <Link to="/UseRefExample2" target="_blank">useRef2</Link>
                </div>
                <div>
                  <Link to="/UseRefExample3" target="_blank">useRef3</Link>
                </div>
                
              </>
            }
          />
        </Routes>

        {/* Routes for different examples */}
        <Routes>
          <Route path="/UseStateExample1" element={<UseStateExample1 />} />
          <Route path="/UseStateExample2" element={<UseStateExample2 />} />
          <Route path="/UseEffectExample1" element={<UseEffectExample1 />} />
          <Route path="/UseEffectExample2" element={<UseEffectExample2 />} />
          <Route path="/UseRefExample1" element={<UseRefExample1 />} />
          <Route path="/UseRefExample2" element={<UseRefExample2 />} />
          <Route path="/UseRefExample3" element={<UseRefExample3 />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
