const fs = require('fs');
const path = require('path');

function findProjectRoot(start) {
	start = start || process.cwd();

	let root = start.includes('node_modules') ? start.split('node_modules')[0].slice(0, -1) : start;

	while (!fs.existsSync(path.resolve(root, 'package.json'))) {
		if (root === '/') {
			break;
		}

		root = findProjectRoot(path.dirname(root));
	}

	return root;
}

function findPackageJson(root) {
	return path.join(findProjectRoot(root), 'package.json');
}

function readPackageJson(root) {
	var packagePath = findPackageJson(root);

	return JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf8' }));
}

function writePackageJson(object, root) {
	var packagePath = findPackageJson(root);

	fs.writeFileSync(packagePath, JSON.stringify(object, null, 2), { encoding: 'utf8' });
}

function findValidatorRoot(root) {
	return root || path.resolve(__dirname, '..');
}

function print(...args) {
	// eslint-disable-next-line no-console
	console.log.apply(console, args);
}

module.exports = {
	print,
	findProjectRoot,
	findPackageJson,
	readPackageJson,
	writePackageJson,
	findValidatorRoot
};