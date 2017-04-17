import React from 'react';
import {render} from 'react-dom';
import Center from 'react-center';
import LocationComponent from './LocationComponent.jsx';
import TimerComponent from './TimerComponent.jsx';

class App extends React.Component {
  render () {
    return (	<Center>
    				<LocationComponent />
    			</Center>
    )
  }
}


render(<App/>, document.getElementById('root'));
