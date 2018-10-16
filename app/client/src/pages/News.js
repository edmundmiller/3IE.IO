import React, { Component } from 'react'
import '../css/News.css'

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: null,
    }
  }

  render() {
    return (
      <div className="News">
        <h1>Hello, this is the news & content page</h1>
      </div>
    )
  }
}

export default News
