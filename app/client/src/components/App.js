import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar'

// pages that the router draws from
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import Project from '../pages/Project';

import ExploreProjects from '../pages/ExploreProjects';
// Auth
import Signup from '../pages/signUp';
import LogIn from '../pages/LogIn';
// Static
import About from '../pages/About'
import Membership from '../pages/Membership'
import News from '../pages/News'
import '../css/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
      <Router>
        <div>
          <NavBar />
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/project" component={Project} />
            <Route path="/profile" component={Profile} />
            <Route path="/projects" component={Project} />
            <Route path="/projects/:id" component={Project} />
            
            {/* Login & Signup Routes */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={LogIn} />

            {/* News */}
            <Route path="/membership" component={Membership} />
            <Route path="/news" component={News} />
        </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
