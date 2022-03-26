import {BrowserRouter, Switch, Route , NavLink} from 'react-router-dom';

import Tictac from "./tic-tac/tic-tac";
import Wordle from "./wordle/wordle";
import Memory from "./memory/memory";
import Tiles from "./2048/tiles";
import './App.css'
function App() {
  return (
    <BrowserRouter>
    <div className="pt-20">
      <ul>
        <li><NavLink data-game="tictac" to="tictac">Tictac</NavLink></li>
        <li><NavLink data-game="2048" to="tiles" >2048 Game</NavLink></li>
        <li><NavLink data-game="wordle" to="wordle" >Wordle</NavLink></li>
        <li><NavLink data-game="memo" to="memo" >Memory Game</NavLink></li>
      </ul>
      <Switch>
        <Route path={["/","/tictac"]} component={Tictac} />
        <Route path="/wordle" component={Wordle} exact />
        <Route path="/memory" component={Memory} exact />
        <Route path="/tiles" component={Tiles} exact />
      </Switch>
    </div>
    </BrowserRouter>
   );
}

export default App;
