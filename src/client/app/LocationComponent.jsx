/* eslint max-len: 0 */
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import LocationApi from './LocationApi.jsx';
import LocationMapComponent from './LocationMapComponent.jsx';
import styler from 'react-styling'

const style = styler
`
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
export default class LocationComponent extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
    	locations: [], 
    	enteredState: props.enteredState,
    	center: [38.9072, -77.0369],
    	map: null
    	};

    this.options = {
      defaultSortName: 'city',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
    this.stateChanged = this.stateChanged.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
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
  
  stateChanged(response) {
  	this.state.map.clear();
  	
  	this.setState({locations: response});
  }
  
  
  handleSubmit(event) {
     this.api = new LocationApi();
  	 this.api.getCities(this.state.enteredState)
  	  .then(response => this.stateChanged(response)) 
  	  .catch(err => alert('err ' + err.toString()));   
  	  
    event.preventDefault();
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
				 <form onSubmit={this.handleSubmit} style={formStyle}>
		        	<label>
		          		State:
		          		<input type="text" value={this.state.enteredState} onChange={this.handleChange} />
		        	</label>
		        	<input type="submit" value="Submit" />
		      	</form>
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
					zoom={8}
					center={this.state.center}/>
			</div>
		</div>

    );
  }

}


