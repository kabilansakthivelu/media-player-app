import React, {useRef, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home/Home';
import Playlists from './Components/Playlists/Playlists';
import Favorites from './Components/Favorites/Favorites';
import Error from './Components/Error';

export const ValuesContext = React.createContext();

function App() {

  const refEmail = useRef();
  const refPassword = useRef();
  const [showPlayer, setShowPlayer] = useState(false);
  const [nowPlayingSongId, setNowPlayingSongId] = useState();

  const openPlayer = (id) =>{
        setShowPlayer(true);
        setNowPlayingSongId(id);
  }

  return (
    <Router>
     <ValuesContext.Provider value={{refEmail, refPassword, showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer}}>
      <Switch>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/playlists">
          <Playlists/>
        </Route>
        <Route path="/favorites">
          <Favorites/>
        </Route>
        <Route path="*">
          <Error/>
        </Route>
      </Switch>
    </ValuesContext.Provider>
    </Router>
  );
}

export default App;
