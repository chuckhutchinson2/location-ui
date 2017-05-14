/* eslint max-len: 0 */
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';

import LocationApi from './LocationApi.jsx';
import LocationMapComponent from './LocationMapComponent.jsx';
import styler from 'react-styling'

const style = styler
`
	divContainer:
		margin: 10px
		padding-bottom: 15px
	
	divLeft:
		float: left
		width: 33%
	
	divRight:
		float: left
		width: 66%		

`
export default class LocationComponent extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
    	locations: [], 
    	states: [],
    	enteredState: props.enteredState,
    	center: [38.9072, -77.0369],
    	map: null
    	};

    this.options = {
      defaultSortName: 'city',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };

    this.onMapLoad = this.onMapLoad.bind(this);
    this.stateChanged = this.stateChanged.bind(this);
    this.statesLoaded = this.statesLoaded.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.selectedState = this.selectedState.bind(this);
    this.processStateSelected = this.processStateSelected.bind(this);
  }
  
  
  statesLoaded(response) {
	//alert(JSON.stringify(response));
	
	var stateList = [];
	
	response.forEach(
		function(state, index) {
    		//alert(JSON.stringify(state));
    		
    		stateList.push ({ 
    							value: state,
    							label: state 
    						});
	});
	
	//alert(JSON.stringify(stateList));
  	this.setState({ states: stateList});
  }
  
  processCoordinates(response) {
  		// alert(JSON.stringify(response));
  		
  		var state = response[0];
  		
  		if (state && state.coordinates) {
	  		this.state.map.draw(state.coordinates, state.color);
	  	}	
  }
  
  processStateSelected(response) {
  
  
    this.api.getCoordinates(this.state.enteredState)
  	  .then(response => this.processCoordinates(response)) 
  	  .catch(err => alert('err ' + err.toString()));   
  	  
  	var location = {
  					latitude: Number(response[0].latitude),
  					longitude: Number(response[0].longitude)
  				};
  
  	// alert(JSON.stringify(location));
  
  	this.setState({
  		locations: response,
  		center: [location.latitude, -1 * location.longitude]
  		});  	
  		
  	this.state.map.center([location.latitude, -1 *  location.longitude]);
  }
  
  componentDidMount() {
   	 this.api = new LocationApi();
   	 this.api.getStates()
   	 	.then(response => this.statesLoaded(response))
   	 	.catch(err => alert('err ' + err.toString()));   
   	 	
  	 this.api.getCities(this.state.enteredState)
  	  .then(response => this.processStateSelected(response)) 
  	  .catch(err => alert('err ' + err.toString()));   
  }
  
  selectedState(val) {
  	this.setState({enteredState: val.value});
   
   	this.api = new LocationApi(); 	
  	this.api.getCities(val.value)
  	  .then(response => this.processStateSelected(response)) 
  	  .catch(err => alert('err ' + err.toString()));   	
  }
  
  stateChanged(response) {
  	this.state.map.clear();
  	
  	this.setState({locations: response});
  }
  
  
  handleRowSelect(row, isSelected, e) {
  	this.state.map.toggleLocation(row);
  }
  
  onMapLoad(map) {
    this.setState({map: map});
  }
  
  render() {

   
   var formStyle = {
		paddingLeft: '10px',
		paddingBottom: '0px'
    };
    
   var mapStyle = {
   		paddingTop: '75px',
  		width: '99%',
  		height: '600px',
  		overflow: 'scroll'
    };

    const selectRow = {
    	mode: 'checkbox',  // multi select
    	onSelect: this.handleRowSelect
  	};    
  	
    return (

		<div style={style.divContainer}>
			
			<div style={style.divLeft}>

			 	<div style={style.divContainer}>
			 	
			 		<div style={style.divLeft}>
			 			Select State:
			 		</div>
			 		
			 		<div style={style.divRight}>
						<Select
						  name="form-field-name"
						  value={this.state.enteredState}
						  options={this.state.states}
						  onChange={this.selectedState}
						/>
			 		</div>
				</div>

				<BootstrapTable
					data={this.state.locations} 
					options={ { noDataText: 'No locations available' } } 
					pagination
					striped 
					hover  
					exportCSV
					selectRow={ selectRow }
					>
					<TableHeaderColumn dataField='city' dataSort filter={ { type: 'TextFilter' } }>City</TableHeaderColumn>
					<TableHeaderColumn dataField='county' dataSort filter={ { type: 'TextFilter' } }>County</TableHeaderColumn>
					<TableHeaderColumn dataField='zip' dataSort filter={ { type: 'TextFilter' } }>Zip Code</TableHeaderColumn>
					<TableHeaderColumn dataField='weatherCode' dataSort filter={ { type: 'TextFilter' } }>Weather Code</TableHeaderColumn>
					<TableHeaderColumn isKey dataField='latitude' hidden export>Latitude</TableHeaderColumn>
					<TableHeaderColumn dataField='longitude' hidden export>Longitude</TableHeaderColumn>	
				</BootstrapTable>
			</div>
			<div style={style.divRight}>
				<LocationMapComponent 
					style={mapStyle}
					ref={this.onMapLoad} 
					zoom={11}
					center={this.state.center}/>
			</div>
		</div>

    );
  }

}


