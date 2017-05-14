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
      position: maps.ControlPosition.TOP_RIGHT,
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
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
    	map: null,
    	markers: []
	    };
    	
    this.onMapLoad = this.onMapLoad.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);
    this.center = this.center.bind(this);
    this.draw = this.draw.bind(this);
    this.getGoogleMap = this.getGoogleMap.bind(this);
  }
  
  getGoogleMap() {
  	return this.state.map.map_;
  }
 
  onMapLoad(map) {
    this.setState({map: map});
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
					};
				
				
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
  
  
  draw(coordinates, regionColor) {
  	if (coordinates && google) {
        // Construct the polygon.
        var polygon = new google.maps.Polygon({
          paths: coordinates,
          strokeColor: regionColor,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: regionColor,
          fillOpacity: 0.35
        });

    	polygon.setMap(this.getGoogleMap());
    }
  }
  
  onMapClick(event) {
        // Define the LatLng coordinates for the polygon's path.
        var bermudaTriangleCoords = [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
          {lat: 25.774, lng: -80.190}
        ];
        
   //     this.draw(bermudaTriangleCoords);
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
		       	ref={this.onMapLoad}
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


