import React from 'react';
import {render} from 'react-dom';
import Center from 'react-center';
import LocationComponent from './LocationComponent.jsx';
import TimerComponent from './TimerComponent.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends React.Component {
  handleSelect(index, last) {
    	console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
  
  render () {
    return (
    	<Tabs
        	onSelect={this.handleSelect}
        	selectedIndex={2}
      		>

			<TabList>
				<Tab>Location</Tab>
				<Tab>Location2</Tab>
			</TabList>
			
			<TabPanel>
    			<LocationComponent />
    		</TabPanel>
 			<TabPanel>
    			<LocationComponent />
    		</TabPanel>   				
    	</Tabs>
    	)
  }
}


render(<App/>, document.getElementById('root'));
