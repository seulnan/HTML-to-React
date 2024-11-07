import logo from './logo.svg';
import './App.css';
import { ButtonStyle } from './components/buttonstyle.jsx';
import { Counter } from './components/counter.jsx';

function App() {
  return (
    <div className="App">
      <ButtonStyle />
      <Counter/>
    </div>
  );
}

export default App;
