/* eslint max-len: 0 */
import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import LocationMarker from './LocationMarker.jsx';

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
    	zoom: props.zoom,
    	markers: []
	    };
    	
    this.toggleLocation = this.toggleLocation.bind(this);
    this.center = this.center.bind(this);
  }
  
  clear() {
  	this.setState({ markers: []});
  }
  
  center(c) {
  	this.setState({center: c});
  }
 
  toggleLocation(location) {
  
  	if (location != null) {
  	
		var data = { 
					lat: location.latitude, 
					lng: -1 * location.longitude,
					title: location.city + ", " + location.state
					}
				
				
		var markers = this.state.markers;
		
		var newMarkers = [];
		
		var found = false;
		for (var i = 0; i < markers.length; i++)
		{
			var marker = markers[i];
		
			if ((marker.lat == data.lat) && (marker.lng == data.lng) && (marker.title == data.title)) {
				found = true;
				continue;
			}
			
			newMarkers.push(marker);
		}
	        				
	    if (found == false) {
			newMarkers.push(data);
		}
		
		this.setState({markers: newMarkers});
	}
  }
  
  onMapClick(event) {

  }

  render() {
  
  	var style = {
	  		width: '1000px',
	  		height: '500px',
	  		overflow: 'scroll'
	};
	
	if (this.props.style != null) {
		style = this.props.style;
	}

	const MarkerList = this.state.markers && this.state.markers.map((data, index) => (
	     <LocationMarker  
	     	key={index} 
	     	lat={data.lat} 
	     	lng={data.lng} text={data.title}/>
	));
    
    return (

		<div style={this.props.style}>
	       <GoogleMap
		       	onClick={this.onMapClick}
		        bootstrapURLKeys={{
				    key: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
				    language: 'en'
				  }}
		        center={this.state.center}
		        options={createMapOptions}
		        zoom={this.state.zoom}>
			       {MarkerList}
	       </GoogleMap>
       </div>
    );
  }
}


