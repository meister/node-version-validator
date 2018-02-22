const debug = require('debug')('version-validator:lib:versions');
const utils = require('./utils');
const path = require('path');
const semver = require('semver');

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

Versions.parseVersion = function(dependency) {
	const privateGitVersion = dependency.match(/^git.+#(.+)$/);

	if (privateGitVersion) {
		return privateGitVersion[1];
	} else {
		return dependency;
	}
};

Versions.getVersion = function(dependency) {
	if (typeof dependency === 'string') {
		return Versions.parseVersion(dependency);
	} else {
		return dependency.version;
	}
};

Versions.validateOutdated = function(key, dependencies, supported, cb) {
	if (supported.hasOwnProperty(key)) {
		const version = Versions.getVersion(dependencies[key]);

		debug('Version for', key, '=', version);

		if (semver.valid(version) && !semver.satisfies(version, supported[key])) {
			return cb({
				current: version,
				supported: supported[key]
			});
		} else if (!semver.valid(version)) {
			return cb({
				current: {
					text: version,
					warning: true,
					note: 'ambiguous'
				},
				supported: supported[key]
			});
		}
	}

	cb();
};

Versions.listOutdated = function() {
	const supported = Versions.listSupported();
	const dependencies = utils.readDependencies();
	const outdated = {};

	Object.keys(dependencies).forEach(key => {
		return Versions.validateOutdated(key, dependencies, supported, (outdatedData) => {
			if (outdatedData) {
				outdated[key] = outdatedData;
			}
		});
	});

	return outdated;
};

module.exports = Versions;