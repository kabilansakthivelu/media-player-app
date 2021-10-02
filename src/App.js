import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import Playlists from './Components/Playlists/Playlists';
import Songs from './Components/Songs/Songs';
import Favorites from './Components/Favorites/Favorites';
import Error from './Components/Error';

function App() {
  return (
    <Router>
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
        <Route path="/songs">
          <Songs/>
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
    </Router>
  );
}

export default App;
