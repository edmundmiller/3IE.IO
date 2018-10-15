import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar'

// pages that the router draws from
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
<<<<<<< HEAD
import Project from '../pages/Project';
=======
import ExploreProjects from '../pages/ExploreProjects';
import Project from '../pages/Project';
// Auth
import Signup from '../pages/signUp';
import Login from '../pages/LogIn';
// Static
import About from '../pages/About'
import Membership from '../pages/Membership'
import News from '../pages/News'
>>>>>>> 87190b3fd9f657d71846b1bf7ce113feb10722b8
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
<<<<<<< HEAD
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/project" component={Project} />
=======
            <Route path="/profile" component={Profile} />
            <Route path="/projects" component={ExploreProjects} />
            <Route path="/projects/:id" component={Project} />
            
            {/* Login & Signup Routes */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />

            {/* News */}
            <Route path="/membership" component={Membership} />
            <Route path="/about" component={About} />
            <Route path="/news" component={News} />
>>>>>>> 87190b3fd9f657d71846b1bf7ce113feb10722b8
        </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
