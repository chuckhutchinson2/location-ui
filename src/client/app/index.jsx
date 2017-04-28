import React from 'react';
import {render} from 'react-dom';
import Center from 'react-center';
import LocationComponent from './LocationComponent.jsx';
import TimerComponent from './TimerComponent.jsx';
import VideoListComponent from './VideoListComponent.jsx';
//    			<VideoListComponent videos={[ "https://www.youtube.com/embed/O2HoQ1fMHts?ecver=1", "https://youtu.be/7QLVMwyxU_Q"]}/>
 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends React.Component {
  handleSelect(index, last) {
    	console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
  
  render () {
    return (
    	<div>
	    	<TimerComponent/>
	    	<Tabs onSelect={this.handleSelect}>
	
				<TabList>
					<Tab>Virginia</Tab>
					<Tab>California</Tab>
					<Tab>Videos</Tab>
					
				</TabList>
				
				<TabPanel>
	    			<LocationComponent enteredState='VA'/>
	    		</TabPanel>
	 			<TabPanel>
	    			<LocationComponent enteredState='CA'/>
	    		</TabPanel>   
	  			<TabPanel>
	    		</TabPanel> 	
	    			
	    	</Tabs>
    	</div>
    	)
  }
}


render(<App/>, document.getElementById('root'));
