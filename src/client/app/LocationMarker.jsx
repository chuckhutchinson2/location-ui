/* eslint max-len: 0 */
import React from 'react';

const K_WIDTH = 200;
const K_HEIGHT = 30;

const Style = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  backgroundImage: 'url(app/pin.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundColor: 'transparent',
  textAlign: 'bottom',
  color: '#3f51b5',
  fontSize: 12,
  fontWeight: 'bold',
  padding: 18
};


export default class LocationMarker extends React.Component {

 constructor(props) {
    super(props);

    this.state = {
    	text: props.text
	};


	this.onClick = this.onClick.bind(this);
  }
  
  
  onClick(event) {
  	alert(this.state.text);
  }
  
  render() {
    return (
          <div 
          		style={Style}
          		onClick={this.onClick}
          		>
          		{this.state.text}
          </div>
    );
  }
 }