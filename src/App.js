import { Routes ,Route , NavLink } from "react-router-dom";
import Tictac from "./tic-tac/tic-tac";
import Wordle from "./wordle/wordle";
import Memory from "./memory/memory";
import Tiles from "./2048/tiles";
import './App.css'
function App() {
  return (
    <div className="App">
      <ul>
        <li><NavLink  data-game="tictac" to="/">Tictac</NavLink></li>
         <li><NavLink data-game="2048" to="tiles" >2048 Game</NavLink></li>
         <li><NavLink data-game="wordle" to="wordle" >Wordle</NavLink></li>
         <li><NavLink data-game="memo" to="/memo" >Memory Game</NavLink></li>
      </ul>
      <Routes>
        <Route path="/" element={<Tictac/>} ></Route>
        <Route path="tiles" element={<Tiles/>} ></Route>
        <Route path="wordle" element={<Wordle/>} ></Route>
        <Route path="memo" element={<Memory/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
