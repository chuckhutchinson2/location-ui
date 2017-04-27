/* eslint max-len: 0 */
import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

const K_WIDTH = 40;
const K_HEIGHT = 40;

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


// https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions

const AnyReactComponent = ({ text }) => <div style={Style}>{text}</div>;

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

export default class LocationMapComponent extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
    	center: props.center,
    	markers: []
    	};
    	
    this.addLocation = this.addLocation.bind(this);
  }
  
  clear() {
  	this.setState({ markers: []});
  }
  
  addLocation(location) {
  
  	if (location != null) {
  	
  //  	alert(JSON.stringify(location));
  	
		var data = { 
					lat: location.latitude, 
					lng: -1 * location.longitude,
					title: location.city + ", " + location.state
				};
				
				
		var markers = this.state.markers;
	        				
		markers.push(data);
		
		this.setState({markers: markers});
	}
  }
  
  onClick(event) {

  }

  render() {
  	var style = {
  		width: '1000px',
  		height: '500px',
		};
		
		
	const ListingMarker = this.state.markers && this.state.markers.map((data, index) => (
	     <AnyReactComponent  
	     	key={index} 
	     	lat={data.lat} 
	     	lng={data.lng}>{data.title}
	     </AnyReactComponent>
	));
    
    return (

		<div style={style}>
	       <GoogleMap
		       	onClick={this.onClick}
		        bootstrapURLKeys={{
				    key: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
				    language: 'en'
				  }}
		        center={this.state.center}
		        options={createMapOptions}
		        zoom={9}>
			       {ListingMarker}
	       </GoogleMap>
       </div>
    );
  }
}


