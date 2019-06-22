'use strict';

const Homey = require('homey');

class AzureDevOpsApp extends Homey.App {
	
	onInit() {
		this.log('AzureDevOpsApp is running...');
	}
	
}

module.exports = AzureDevOpsApp;