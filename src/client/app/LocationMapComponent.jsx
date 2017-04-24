/* eslint max-len: 0 */
import React, {Component} from 'react';
import PureComponent from 'react-pure-render-utils/component';
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

export default class LocationMapComponent extends PureComponent {
  
  constructor(props) {
    super(props);
    
    this.state = {
    	center: props.center,
    	map: null
    	};
    	
    this.onClick = this.onClick.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
    this.addLocation = this.addLocation.bind(this);
  }
  
  addLocation(location) {
  
  
  	if (location != null && this.state.map != null) {
  	
  		var data = { 
        				lat: location.latitude, 
        				lng: -1 * location.longitude,
        				title: location.city + ", " + location.state
        				};
  	
  		this.state.map.data.loadGeoJson(location);
//  		this.state.map.addMarker(new google.maps.MarkerOptions()
//        	.position( { 
//        				lat: location.latitude, 
//        				lng: -1 * location.longitude
//        				})
//        	.title(location.city + ", " + location.state));
  	}
  }
  
  onClick(event) {

  }
  
  onMapLoad(map) {    
  	if (map != null) 
  	{ 
  		this.state.map = map; 
  	}
  }

  render() {
  	var style = {
  		width: '1000px',
  		height: '500px',
		};
    
    var that = this;
    	
    return (

    	<div style={style}>
       <GoogleMap
       		ref={this.onMapLoad}
       	onClick={this.onClick}
        bootstrapURLKeys={{
		    key: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
		    language: 'en'
		  }}
        center={this.state.center}
        options={createMapOptions}
        zoom={9}>
       <AnyReactComponent
          lat={38.8339}
          lng={-77.2048}
          text={'Alexandia'} />
       </GoogleMap>
       </div>
    );
  }
}


