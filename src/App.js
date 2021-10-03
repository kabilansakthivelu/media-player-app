import React, {useRef} from 'react';
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

  return (
    <Router>
     <ValuesContext.Provider value={{refEmail, refPassword}}>
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
