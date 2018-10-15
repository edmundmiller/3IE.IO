import React, {Component} from 'react'

class Project extends Component {
  constructor (props) {
    super(props)
    this.state ={
      projectTitle: '',
      projectDescription: ''
    }
  }

  render() {
    return(
      <div>
        <h1>Hello, this is a project page</h1>
      </div>
    )
  }
}

export default Project