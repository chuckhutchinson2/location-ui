/* eslint max-len: 0 */
import RestClient from 'react-native-rest-client';

export default class WhatIsMyLocationApi {
	
  constructor() {
  	this.api = new RestClient('https://freegeoip.net');
  }
  
  getLocation(ip) {
	  return this.api.GET('/json/' + ip)
	  .then(response => response);
  }
}