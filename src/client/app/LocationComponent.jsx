/* eslint max-len: 0 */
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import SplitPane from 'react-split-pane';

import LocationApi from './LocationApi.jsx';
import LocationMapComponent from './LocationMapComponent.jsx';

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
  	this.state.map.addLocation(row);
  }
  
  onMapLoad(map) {
    this.setState({map: map});
  }
  
  render() {
    var style = {
		width: '100%'
    };
   
   var tableStyle = {
		padding: '10px',
    };
    
   var mapStyle = {
   		padding: '10px',
  		width: '400px',
  		height: '400px',
  		overflow: 'scroll'
    };
    
    const selectRow = {
    	mode: 'checkbox',  // multi select
    	onSelect: this.handleRowSelect
  	};    
  	
    return (
    
    <div>
    	<form onSubmit={this.handleSubmit}>
        	<label>
          		State:
          		<input type="text" value={this.state.enteredState} onChange={this.handleChange} />
        	</label>
        	<input type="submit" value="Submit" />
      	</form>
      	
		<SplitPane split="vertical" minSize={400} maxSize={400} defaultSize={400} className="primary">
			<div>
				<BootstrapTable
					data={this.state.locations} 
					options={ { noDataText: 'No locations available' } } 
					pagination
					striped 
					hover  
					exportCSV
					selectRow={ selectRow }
					>
					<TableHeaderColumn isKey dataField='city' dataSort filter={ { type: 'TextFilter' } }>City</TableHeaderColumn>
					<TableHeaderColumn dataField='county' dataSort filter={ { type: 'TextFilter' } }>County</TableHeaderColumn>
					<TableHeaderColumn dataField='zip' dataSort filter={ { type: 'TextFilter' } }>Zip Code</TableHeaderColumn>
				</BootstrapTable>
			</div>
			<div>
				<LocationMapComponent 
					style={mapStyle}
					ref={this.onMapLoad} 
					center={this.state.center}/>
			</div>
		</SplitPane>
	</div>
    );
  }

}


