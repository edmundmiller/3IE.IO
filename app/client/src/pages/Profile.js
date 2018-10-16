import React, {Component} from 'react';

import Avatar from '../components/profile/Avatar';
// import Avatar from '@material-ui/core/Avatar';
import Info from '../components/profile/Info';

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
      <div>
        {/* <Avatar
          alt="Leemon Baird"
          src="../images/Leemon-752x506.jpg"
          className='avatar-profile'
        /> */}
        <Avatar />
        <Info />
      </div>
    );
  }
}

export default Profile;
