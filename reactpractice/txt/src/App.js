import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import your example files
import UseState1 from './useState1';
import UseState2 from './useState2';
import UseEffect1 from './useEffect1';
import UseEffect2 from './useEffect2';
import UseRef1 from './useRef1';
import UseRef2 from './useRef2';
import UseRef3 from './useRef3';
import UseRef4 from './useRef4';

function App() {
  return (
    <Router>
      <div>
        <h1>React Hook Examples</h1>
        <ul>
          <li><Link to="/useState1">useState Example 1</Link></li>
          <li><Link to="/useState2">useState Example 2</Link></li>
          <li><Link to="/useEffect1">useEffect Example 1</Link></li>
          <li><Link to="/useEffect2">useEffect Example 2</Link></li>
          <li><Link to="/useRef1">useRef Example 1</Link></li>
          <li><Link to="/useRef2">useRef Example 2</Link></li>
          <li><Link to="/useRef3">useRef Example 3</Link></li>
          <li><Link to="/useRef4">useRef Example 4</Link></li>
        </ul>

        <Routes>
          <Route path="/useState1" element={<UseState1 />} />
          <Route path="/useState2" element={<UseState2 />} />
          <Route path="/useEffect1" element={<UseEffect1 />} />
          <Route path="/useEffect2" element={<UseEffect2 />} />
          <Route path="/useRef1" element={<UseRef1 />} />
          <Route path="/useRef2" element={<UseRef2 />} />
          <Route path="/useRef3" element={<UseRef3 />} />
          <Route path="/useRef4" element={<UseRef4 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
