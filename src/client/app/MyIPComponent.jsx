import React from 'react';
import WhatIsMyIpApi from './WhatIsMyIpApi.jsx';

export default class MyIPComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { ip: '' };
  }
  
  getIp(ip) {
  	this.setState({ip: ip});
  }
  
  componentDidMount() {
  	this.whatIsMyIpApi = new WhatIsMyIpApi();
	this.whatIsMyIpApi.getIp()
	  .then(ip => this.getIp(ip))
	  .catch(err => alert('err ' + err.toString()));   
  }
  
  componentWillUnmount() {

  }

  render() {
    return (<span>{this.state.ip}</span>);
  }

}


