const utils = require('./utils');
const path = require('path');

/**
 * @type {Object}
 */
let configuration;

/**
 * @returns {Object} Configuration object
 */
function readConfiguration() {
	const configFile = path.join(utils.findProjectRoot(), 'versions.json');

	configuration = require(configFile);

	return configuration;
}

function listSupported() {
	if (!configuration) {
		readConfiguration();
	}

	return Object.entries(configuration.supported);
}

module.exports = {
	readConfiguration,
	listSupported
};