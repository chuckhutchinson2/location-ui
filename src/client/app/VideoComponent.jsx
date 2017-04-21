import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class VideoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {url: props.url};
  }
  
   render () {
    return <ReactPlayer 
    			url={this.state.url} 
    			controls='true'
    		/>
  }
}

export default VideoComponent;
