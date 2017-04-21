import React, { Component } from 'react'
import VideoComponent from './VideoComponent.jsx';
import styler from 'react-styling'

class VideoListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {videos: props.videos};
  }
  
   render () {
     	var videoList = this.state.videos.map(function(videoUrl){
                return <li style={style.menu.item}><VideoComponent url={videoUrl}/></li>;
              })
   
    	return (<div> 
    				<ul style={style.menu}>{ videoList }</ul>
    			</div>);
  }
}
const style = styler
`
  menu
    list-style-type: none
 
    item
      display: inline-block
      padding: 10px
`

export default VideoListComponent;
