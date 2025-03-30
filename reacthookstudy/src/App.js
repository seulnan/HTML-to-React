import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UseEffectExample1 from './UseEffectExample1';
import UseEffectExample2 from './UseEffectExample2';
import UseRefExample1 from './UseRefExample1';
import UseRefExample2 from './UseRefExample2';
import UseRefExample3 from './UseRefExample3';
import UseRefExample4 from './UseRefExample4';
import UseStateExample1 from './UseStateExample1';
import UseStateExample2 from './UseStateExample2';

function App() {
  return (
    <Router>
      <div>
        <h1>React Hook Examples</h1>
        <nav>
          <ul>
            <li><Link to="/use-state-example-1">UseState1</Link></li>
            <li><Link to="/use-state-example-2">UseState2</Link></li>
            <li><Link to="/use-effect-example-1">UseEffect1</Link></li>
            <li><Link to="/use-effect-example-2">UseEffect2</Link></li>
            <li><Link to="/use-ref-example-1">UseRef1</Link></li>
            <li><Link to="/use-ref-example-2">UseRef2</Link></li>
            <li><Link to="/use-ref-example-3">UseRef3</Link></li>
            <li><Link to="/use-ref-example-4">UseRef4</Link></li>
            
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<h1>React Hook Examples</h1>} />
        <Route path="/use-effect-example-1" element={<UseEffectExample1 />} />
        <Route path="/use-effect-example-2" element={<UseEffectExample2 />} />
        <Route path="/use-ref-example-1" element={<UseRefExample1 />} />
        <Route path="/use-ref-example-2" element={<UseRefExample2 />} />
        <Route path="/use-ref-example-3" element={<UseRefExample3 />} />
        <Route path="/use-ref-example-4" element={<UseRefExample4 />} />
        <Route path="/use-state-example-1" element={<UseStateExample1 />} />
        <Route path="/use-state-example-2" element={<UseStateExample2 />} />
      </Routes>
    </Router>
  );
}

export default App;
