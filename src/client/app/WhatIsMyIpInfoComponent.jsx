import React from 'react';
import IpInfoApi from './IpInfoApi.jsx';
import LocationMapComponent from './LocationMapComponent.jsx';

import styler from 'react-styling'

const style = styler
`
	table:
		padding: 15px
		margin: 20px
		border: 1px solid black
		
	td:
		padding: 5px
		margin: 5px
		border: 1px solid black
		
	divContainer:
		margin: 5px
		padding-bottom: 15px
	
	divLeft:
		float: left
		width: 33%
	
	divRight:
		float: left
		width: 66%		
`

export default class WhatIsMyIpInfoComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	ipInfo: '',
    	center: [38.9072, -77.0369],
    	map: null
    	};
    
   	this.onMapLoad = this.onMapLoad.bind(this);
  }
  
  onMapLoad(map) {
    this.setState({map: map});
  }
  
  getIpInfo(ipInfo) {
  	
  	var location = ipInfo.loc.split(",");

  	this.state.map.toggleLocation ({
  		latitude: location[0], 
  		longitude: -1 * location[1],
  		city: ipInfo.city,
  		state: ipInfo.region
  	});
  	
  	this.setState({
  			ipInfo: ipInfo,
  			center: [location[0], -1 * location[1]]
  			});
  			
  	this.state.map.center([Number(location[0]),  Number(location[1])]);
   	//alert(JSON.stringify(location));
  }
  
  componentDidMount() {
  	this.ipInfoApi = new IpInfoApi();
	this.ipInfoApi.getIpInfo()
	  .then(location => this.getIpInfo(location))
	  .catch(err => alert('err ' + err.toString()));   
  }
  

  componentWillUnmount() {
  }

  render() {
  	var mapStyle = {
   		padding: '15px',
  		width: '100%',
  		height: '400px',
  		overflow: 'hidden'
    };
    
    return (
    	<div style={style.divContainer}>
    		<div style={style.divLeft}>
		    	<table style={style.table}>
		    		<tr>
			    		<td style={style.td}>IP</td><td style={style.td}>{this.state.ipInfo.ip}</td>
			    	</tr>
		    		<tr>
			 	  		<td style={style.td}>Host</td><td style={style.td}>{this.state.ipInfo.hostname}</td>
			    	</tr>
		    		<tr>
				   		<td style={style.td}>city</td><td style={style.td}>{this.state.ipInfo.city}</td>
			    	</tr>			    	
		    		<tr>
				   		<td style={style.td}>Region</td><td style={style.td}>{this.state.ipInfo.region}</td>
			    	</tr>
		    		<tr>
				   		<td style={style.td}>Country</td><td style={style.td}>{this.state.ipInfo.country}</td>
			    	</tr>

		    		<tr>
				   		<td style={style.td}>Provider</td><td style={style.td}>{this.state.ipInfo.org}</td>
			    	</tr>
		    		<tr>
				   		<td style={style.td}>Zip Code</td><td style={style.td}>{this.state.ipInfo.postal}</td>
			    	</tr>
		    		<tr>
				   		<td style={style.td}>lat/lng</td><td style={style.td}>{this.state.ipInfo.loc}</td>
			    	</tr>
				</table>
			</div>
			<div style={style.divRight}>
				<LocationMapComponent 
					style={mapStyle}
					ref={this.onMapLoad} 
					zoom={10}
					center={this.state.center}/>			
			</div>
		</div>
    	
    	);
  }

}

