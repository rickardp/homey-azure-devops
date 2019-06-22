'use strict';

const Homey = require('homey');
const azdev = require('azure-devops-node-api');

class AzureDevOpsProjectDriver extends Homey.Driver {
	
	onInit() {
		this.log('AzureDevOpsProjectDriver has been inited');
	}
	
    onPair( socket ) {
		let baseuri = '';
		let pat_token = '';
		let coreApi = null;
  
		socket.on('login', ( data, callback ) => {
			baseuri = 'https://dev.azure.com/' + data.username;
			pat_token = data.password;
  
			let authHandler = azdev.getPersonalAccessTokenHandler(pat_token);
			let connection = new azdev.WebApi(baseuri, authHandler);

			connection.getCoreApi()
				.then(core => {
					coreApi = core;
					console.log(core);
					callback( null, true );
			  	}).catch(err => {
					if(err.name == 'AuthError') {
						callback( null, false );
					} else {
						callback(err);
					}
			  	});
		});
  
		socket.on('list_devices', ( data, callback ) => {
  
			coreApi.getProjects()
				.then(projects => {
					console.log(projects);
					const devices = projects.map(project => {
						return {
							name: project.name,
							data: {
								id: project.id
							},
							settings: {
								baseuri,
								pat_token
							},
							icon: '/icon.svg'
						};
					});
					callback(null, devices);
				})
		});
	  }
}

module.exports = AzureDevOpsProjectDriver;