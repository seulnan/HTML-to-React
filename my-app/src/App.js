import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UseStateExample1 from './UseStateExample1';
import UseStateExample2 from './UseStateExample2';
import UseEffectExample1 from './UseEffectExample1';
import UseEffectExample2 from './UseEffectExample2';
import UseRefExample1 from './UseRefExample1';
import UseRefExample2 from './UseRefExample2';
import UseRefExample3 from './UseRefExample3';

function App() {
    return (
        <Router>
            <div>
                <h1>React Hook Examples</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div><Link to="/useState1">useState Example 1</Link></div>
                    <div><Link to="/useState2">useState Example 2</Link></div>
                    <div><Link to="/useEffect1">useEffect Example 1</Link></div>
                    <div><Link to="/useEffect2">useEffect Example 2</Link></div>
                    <div><Link to="/useRef1">useRef Example 1</Link></div>
                    <div><Link to="/useRef2">useRef Example 2</Link></div>
                    <div><Link to="/useRef3">useRef Example 3</Link></div>
                </div>

                <Routes>
                    <Route path="/useState1" element={<UseStateExample1 />} />
                    <Route path="/useState2" element={<UseStateExample2 />} />
                    <Route path="/useEffect1" element={<UseEffectExample1 />} />
                    <Route path="/useEffect2" element={<UseEffectExample2 />} />
                    <Route path="/useRef1" element={<UseRefExample1 />} />
                    <Route path="/useRef2" element={<UseRefExample2 />} />
                    <Route path="/useRef3" element={<UseRefExample3 />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
