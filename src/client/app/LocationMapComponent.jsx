/* eslint max-len: 0 */
import React, {Component} from 'react';
import PureComponent from 'react-pure-render-utils/component';
import GoogleMap from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class LocationMapComponent extends PureComponent {
  
  constructor(props) {
    super(props);
  }

  render() {
  	var style = {
  		width: '1000px',
  		height: '500px',
		};

    return (
    	<div style={style}>
       <GoogleMap
        bootstrapURLKeys={{
		    key: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
		    language: 'en'
		  }}
        center={[60.938043, 30.337157]}
        zoom={9}>
       <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'} />
       </GoogleMap>
       </div>
    );
  }
}


