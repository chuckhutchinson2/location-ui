/* eslint max-len: 0 */
import RestClient from 'react-native-rest-client';

export default class IpInfoApi {
	
  constructor() {
  	this.api = new RestClient('https://ipinfo.io');
  }
  
  getIpInfo() {
	  return this.api.GET('/json')
	  .then(response => response);
  }
}
