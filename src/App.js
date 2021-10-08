import React, {useRef, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import Favorites from './Components/Favorites/Favorites';
import Error from './Components/Error';
import {db} from './firebase';

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

  const [songsList, setSongsList] = useState();

  useEffect(()=>{
        setShowPlayer(false);
        db.collection('songs').onSnapshot((snapshot)=>{
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data());
        })
        setSongsList(arr);
        })      
    },[])

  return (
    <Router>
     <ValuesContext.Provider value={{refEmail, refPassword, songsList, showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer}}>
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
        <Route path="/search">
          <Search/>
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
