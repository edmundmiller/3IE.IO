import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import Project from '../pages/Project';
import '../css/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
      <Router>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/project" component={Project} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
