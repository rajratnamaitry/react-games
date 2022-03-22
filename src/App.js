import Tictac from "./tic-tac/tic-tac";
import './App.css'
import { useState } from 'react';
function App() {
  const [game, setGame] = useState('tictac');
  const handleClick = (e) => {
    const caseName = e.target.getAttribute('data-game');
    setGame(caseName)
  }
  return (
    <div className="App">
      <ul>
        <li><div className="active" data-game="tictac" onClick={handleClick}>Tictac</div></li>
         <li><div data-game="memo" onClick={handleClick} >Memory Game</div></li>
      </ul>
      { game === 'tictac' ? <Tictac></Tictac> : <div></div> }
    </div>
  );
}

export default App;
