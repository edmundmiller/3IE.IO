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
        <h1>Hello, this is a explore projects page</h1>
      </div>
    )
  }
}

export default Project
