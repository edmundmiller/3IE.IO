import React, {Component} from 'react';
import Avatar from '../components/profile/Avatar';
import Info from '../components/profile/Info';
import Descriptions from '../components/profile/Descriptions';
import '../css/Profile.css';

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      projects: null,
      balance: null
    };
  }

  render() {
    return (
      <div className='Profile'>
        <Info />
        <div className='profile-div'></div>
        <Descriptions />
      </div>
    );
  }
}

export default Profile;
