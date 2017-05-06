/* eslint max-len: 0 */
import RestClient from 'react-native-rest-client';

export default class WhatIsMyIpApi {
	
  constructor() {
  	this.api = new RestClient('https://api.ipify.org');
  }
  
  getIp() {
	  return this.api.GET('?format=json')
	  .then(response => response.ip);
  }
}