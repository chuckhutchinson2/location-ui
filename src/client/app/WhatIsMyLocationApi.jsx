/* eslint max-len: 0 */
import fetchJsonp from 'fetch-jsonp';

export default class WhatIsMyLocationApi {
	
  constructor() {
   }
  
  getLocation() {
	  return fetchJsonp('https://freegeoip.net/json').then( response => response.json()).catch(function(ex) {
	    console.log('parsing failed', ex)
	  });
  }
}