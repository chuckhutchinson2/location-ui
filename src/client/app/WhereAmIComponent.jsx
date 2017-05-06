import React from 'react';

import WhatIsMyIpApi from './WhatIsMyIpApi.jsx';
import WhatIsMyLocationApi from './WhatIsMyLocationApi.jsx';

export default class WhereAmIComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { ip: null };
  }
  
  componentDidMount() {
   	 this.api = new WhatIsMyIpApi();
  	 this.api.getIp()
  	  .then(response => this.setState({ip: response})) 
  	  .catch(err => alert('err ' + err.toString()));   

  }
  

  componentWillUnmount() {

  }

  render() {
    return (<span>{this.state.ip}</span>);
  }

}

