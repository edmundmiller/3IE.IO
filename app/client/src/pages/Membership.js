import React, { Component } from 'react'

class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: null,
    }
  }

  render() {
    return (
      <div>
        <h1>Hello, this is the membership page</h1>
      </div>
    )
  }
}

export default Project
