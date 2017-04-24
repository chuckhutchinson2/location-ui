/* eslint max-len: 0 */
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import LocationApi from './LocationApi.jsx';
import LocationMapComponent from './LocationMapComponent.jsx';

export default class LocationComponent extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
    	locations: [], 
    	enteredState: props.enteredState,
    	map: null
    	};

    this.options = {
      defaultSortName: 'city',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.useLocation = this.useLocation.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
  }
  
  componentDidMount() {
   	 this.api = new LocationApi();
  	 this.api.getCities(this.state.enteredState)
  	  .then(response => this.setState({locations: response})) 
  	  .catch(err => alert('err ' + err.toString()));   
  }

  handleChange(event) {
    this.setState({enteredState: event.target.value});
  }
  
  handleSubmit(event) {
     this.api = new LocationApi();
  	 this.api.getCities(this.state.enteredState)
  	  .then(response => this.setState({locations: response})) 
  	  .catch(err => alert('err ' + err.toString()));   
  	  
    event.preventDefault();
  }
  
  useLocation(e) {
   //e.preventDefault();
   alert('abc');
  }
  
    
  hrefIdFormatter(cell, row) {
    return <a href="#" onClick={this.useLocation}>{row.city}</a>
  }
  
  onMapLoad(map) {
  
  	this.state.map = map;
  	
  	if (this.state.map != null) {
  	
  		this.state.map.addLocation(this.state.locations[0]);
  	}
  }
  
  render() {
    return (
    <div>
    	<form onSubmit={this.handleSubmit}>
        	<label>
          		State:
          		<input type="text" value={this.state.enteredState} onChange={this.handleChange} />
        	</label>
        	<input type="submit" value="Submit" />
      	</form>
      	
		<BootstrapTable 
			data={this.state.locations} 
			options={ { noDataText: 'No locations available' } } 
			options={ this.options }
			pagination
			striped 
			hover  
			scrollTop={ 'Bottom' }>
			<TableHeaderColumn isKey dataField='city' dataFormat={this.hrefIdFormatter} dataSort>City</TableHeaderColumn>
			<TableHeaderColumn dataField='county' dataSort>County</TableHeaderColumn>
			<TableHeaderColumn dataField='zip' dataSort>Zip Code</TableHeaderColumn>
			<TableHeaderColumn dataField='latitude' dataSort>Latitude</TableHeaderColumn>
			<TableHeaderColumn dataField='longitude' dataSort>Longitude</TableHeaderColumn>	
		</BootstrapTable>
		<LocationMapComponent ref={this.onMapLoad} center={[38.9072, -77.0369]}/>
	</div>
    );
  }

}


