'use strict';

const Homey = require('homey')

class AzureDevOpsProjectDevice extends Homey.Device {
	
	onInit() {
		this.log('AzureDevOpsProjectDevice has been inited')
	}
}

module.exports = AzureDevOpsProjectDevice;
