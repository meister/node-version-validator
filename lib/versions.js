const utils = require('./utils');
const path = require('path');

const Versions = {
	configuration: false
};

/**
 * @returns {Object} Configuration object
 */
Versions.readConfiguration = function(root) {
	const configFile = path.resolve(utils.findValidatorRoot(root), 'versions.json');

	Versions.configuration = require(configFile);

	return Object.assign({ supported: {} }, Versions.configuration);
};

Versions.listSupported = function() {
	if (!Versions.configuration) {
		Versions.readConfiguration();
	}

	return Versions.configuration.supported;
};

Versions.listOutdated = function() {
	const supported = Versions.listSupported(),
		packageJson = utils.readPackageJson(),
		outdated = {};

	Object.keys(packageJson.dependencies).forEach(key => {
		if (supported.hasOwnProperty(key)) {
			outdated[key] = {
				current: packageJson.dependencies[key],
				supported: supported[key]
			};
		}
	});

	return outdated;
};

module.exports = Versions;