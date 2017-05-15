/* eslint max-len: 0 */
import RestClient from 'react-native-rest-client';

export default class LocationApi {
	
  constructor() {
  	this.api = new RestClient('http://location-dev-alb-ecs-130671189.us-east-1.elb.amazonaws.com');
  }
  
  getCities(state) {
	  return this.api.GET('/cities/' + state)
	  .then(response => response);
  }
  
  getCoordinates(state) {
	  return this.api.GET('/place/' + state)
	  .then(response => response);
  }

  getStates() {
	  return this.api.GET('/states')
	  .then(response => response);
  }
  
}