/* eslint max-len: 0 */
import RestClient from 'react-native-rest-client';

export default class LocationApi {
	
  constructor() {
  	this.api = new RestClient('http://localhost:8080');
  }
  
  getCities(state) {
	  return this.api.GET('/cities/' + state)
	  .then(response => response);
  }
  
  getCoordinates(state) {
	  return this.api.GET('/state/state/' + state)
	  .then(response => response);
  }

  getStates() {
	  return this.api.GET('/states')
	  .then(response => response);
  }
  
}