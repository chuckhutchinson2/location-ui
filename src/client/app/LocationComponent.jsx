/* eslint max-len: 0 */
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RestClient from 'react-native-rest-client';


var locationsMock = [{
      city: "Rockville",
      county: "Montgomery",
      zip: 20850,
      latitude: 39.4249,
      longitude: 75.8149
  },{
      city: "Bethesda",
      county: "Montgomery",
      zip: 20850,
      latitude: 39.4249,
      longitude: 75.8149
  },{
      city: "Gaithersburg",
      county: "Montgomery",
      zip: 20850,
      latitude: 39.4249,
      longitude: 75.8149
  }];



export default class LocationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {locations: []};
    
    this.options = {
      defaultSortName: 'city',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
  }
  
  componentDidMount() {
  	const api = new RestClient('http://localhost:8080');
  	
  	api.GET('/cities/MD')
  	  .then(response => this.setState({locations: response})) 
  	  .catch(err => alert('err ' + err.toString()));   
  }

  render() {
    return (
		<BootstrapTable 
			data={this.state.locations} 
			options={ { noDataText: 'No locations available' } } 
			options={ this.options }
			pagination
			striped 
			hover  
			scrollTop={ 'Bottom' }>
			<TableHeaderColumn isKey dataField='city' dataSort>City</TableHeaderColumn>
			<TableHeaderColumn dataField='county' dataSort>County</TableHeaderColumn>
			<TableHeaderColumn dataField='zip' dataSort>Zip Code</TableHeaderColumn>
			<TableHeaderColumn dataField='latitude' dataSort>Latitude</TableHeaderColumn>
			<TableHeaderColumn dataField='longitude' dataSort>Longitude</TableHeaderColumn>	
		</BootstrapTable>
    );
  }

}


