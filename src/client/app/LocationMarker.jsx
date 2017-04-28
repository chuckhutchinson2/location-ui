/* eslint max-len: 0 */
import React from 'react';

const K_WIDTH = 5;
const K_HEIGHT = 5;

const Style = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
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