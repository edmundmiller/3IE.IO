import React, {Component} from 'react'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state ={
      projects: null,
    }
  }

  render() {
    return(
      <div>
        <h1 style={{color: 'white'}}>Hello, this is profiles page</h1>
      </div>
    )
  }
}

export default Profile