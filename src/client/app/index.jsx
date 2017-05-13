import React from 'react';
import {render} from 'react-dom';
import Center from 'react-center';
import LocationComponent from './LocationComponent.jsx';
import TimerComponent from './TimerComponent.jsx';
import WhereAmIComponent from './WhereAmIComponent.jsx';
import VideoListComponent from './VideoListComponent.jsx';
import MyIPComponent from './MyIPComponent.jsx';
import WhatIsMyIpInfoComponent from './WhatIsMyIpInfoComponent.jsx';

//    			<VideoListComponent videos={[ "https://www.youtube.com/embed/O2HoQ1fMHts?ecver=1", "https://youtu.be/7QLVMwyxU_Q"]}/>
 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styler from 'react-styling'

const style = styler
`
	divContainer:
		margin: 5px
		padding-bottom: 15px
	
	divLeft:
		float: left
	
	divRight:
		float: right
		
	tab:
		margin: 5px
`

class App extends React.Component {
  handleSelect(index, last) {
    	console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
  
  render () {
    return (
    	<div>
	    	<div style={style.divContainer}>
	    		<div style={style.divLeft}>
	    			<TimerComponent/>
	    		</div>
	   			<div style={style.divRight}> 		
		    		<MyIPComponent/>
				</div>
			</div>
	    	<Tabs style={style.tab} onSelect={this.handleSelect}>
	
				<TabList>
					<Tab>Virginia</Tab>
					<Tab>California</Tab>
					<Tab>Where Ami</Tab>
					<Tab>Ip Info</Tab>					
				</TabList>
				
				<TabPanel>
	    			<LocationComponent enteredState='VA'/>
	    		</TabPanel>
	 			<TabPanel>
	    			<LocationComponent enteredState='CA'/>
	    		</TabPanel>   
	  			<TabPanel>
	  				<WhereAmIComponent/>
	    		</TabPanel> 	
	  			<TabPanel>
	  				<WhatIsMyIpInfoComponent/>
	    		</TabPanel> 	    			
	    	</Tabs>
    	</div>
    	)
  }
}


render(<App/>, document.getElementById('root'));
