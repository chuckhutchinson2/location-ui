import React from 'react';
import {render} from 'react-dom';
import LocationComponent from './LocationComponent.jsx';
import TimerComponent from './TimerComponent.jsx';

class App extends React.Component {
  render () {
    return <div>
		<TimerComponent />
		<LocationComponent />
	</div>
	   
  }
}

render(<App/>, document.getElementById('app'));
