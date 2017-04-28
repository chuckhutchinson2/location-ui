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

const K_SIZE = 5;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
  border: '5px solid #f44336',
  color: '#3f51b5'
};

const greatPlaceStyleHover = {
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
  border: '5px solid #3f51b5',
  color: '#f44336'
};

export default class LocationMarker extends React.Component {

 constructor(props) {
    super(props);

    this.state = {
    	text: props.text
	};

  }
  render() {

	const style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;
	
    return (

		<div className="hint hint--html hint--info hint--top" style={style}>
          <div>{this.state.text}</div>
          <div style={{width: 80}} className="hint__content">
          Сlick me
          </div>
       </div>
    );
  }
 }