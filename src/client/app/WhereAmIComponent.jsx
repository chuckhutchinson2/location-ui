import React from 'react';

import WhatIsMyLocationApi from './WhatIsMyLocationApi.jsx';

export default class WhereAmIComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { location: '' };
  }
  
  getLocation(location) {
  	this.setState({location: location});
  }
  
  componentDidMount() {
  	this.whatIsMyLocationApi = new WhatIsMyLocationApi();
	this.whatIsMyLocationApi.getLocation()
	  .then(location => this.getLocation(location))
	  .catch(err => alert('err ' + err.toString()));   
  }
  

  componentWillUnmount() {

  }

  render() {
    return (
    	<div>
	    	<div>IP: {this.state.location.ip}</div>
	   		<div>country_code: {this.state.location.country_code}</div>
	   		<div>region_code: {this.state.location.region_code}</div>
	   		<div>region_name: {this.state.location.region_name}</div>
	   		<div>city: {this.state.location.city}</div>
	   		<div>zip_code: {this.state.location.zip_code}</div>
	   		<div>time_zone: {this.state.location.time_zone}</div>
	   		<div>latitude: {this.state.location.latitude}</div>
	   		<div>longitude: {this.state.location.longitude}</div>
	   		<div>metro_code: {this.state.location.metro_code}</div>
		</div>
    	
    	);
  }

}

