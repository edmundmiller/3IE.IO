import React from 'react';
<<<<<<< HEAD
// import NavBar from './NavBar'      TODO: complete firebase implemenation
import Landing from '../pages/Landing';
=======
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
>>>>>>> 30a5e79ce6aaa7f94d25bcaf53a660912f6bae56
import '../css/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        <Landing />
=======
      <Router>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
>>>>>>> 30a5e79ce6aaa7f94d25bcaf53a660912f6bae56
      </div>
    );
  }
}

export default App;
