import React from 'react';
import WhatIsMyLocationApi from './WhatIsMyLocationApi.jsx';
import styler from 'react-styling'

const style = styler
`
	table:
		padding: 18px
		margin: 20px
		border: 1px solid black
		
	td:
		padding: 5px
		margin: 5px
		border: 1px solid black
`

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
    	<table style={style.table}>
    		<tr>
	    		<td style={style.td}>IP</td><td style={style.td}>{this.state.location.ip}</td>
	    	</tr>
    		<tr>
	 	  		<td style={style.td}>country_code</td><td style={style.td}>{this.state.location.country_code}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>region_code</td><td style={style.td}>{this.state.location.region_code}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>region_name</td><td style={style.td}>{this.state.location.region_name}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>city</td><td style={style.td}>{this.state.location.city}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>zip_code</td><td style={style.td}>{this.state.location.zip_code}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>time_zone</td><td style={style.td}>{this.state.location.time_zone}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>latitude</td><td style={style.td}>{this.state.location.latitude}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>longitude</td><td style={style.td}>{this.state.location.longitude}</td>
	    	</tr>
    		<tr>
		   		<td style={style.td}>metro_code</td><td style={style.td}>{this.state.location.metro_code}</td>
	    	</tr>
		</table>
    	
    	);
  }

}

