const fs = require('fs');
const path = require('path');

const local = {};

local.findProjectRoot = function(start) {
	start = start || process.cwd();

	let root = start.includes('node_modules') ? start.split('node_modules')[0].slice(0, -1) : start;

	while (!fs.existsSync(path.join(root, 'package.json'))) {
		if (root === '/') {
			break;
		}

		root = local.findProjectRoot(path.dirname(root));
	}

	return root;
};

local.findPackageJson = function(root) {
	return path.join(local.findProjectRoot(root), 'package.json');
};

local.readPackageJson = function(root) {
	var packagePath = local.findPackageJson(root);

	return fs.readFileSync(packagePath, { encoding: 'utf8' });
};

local.writePackageJson = function(object, root) {
	var packagePath = local.findPackageJson(root);

	fs.writeFileSync(packagePath, JSON.stringify(object, null, 2), { encoding: 'utf8' });
};

local.print = console.log; // eslint-disable-line no-console

module.exports = local;