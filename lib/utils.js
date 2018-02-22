const debug = require('debug')('version-validator:lib:utils');
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

function readJsonFromProject(file, root) {
	const projectRoot = findProjectRoot(root);

	try {
		return JSON.parse(fs.readFileSync(path.join(projectRoot, file), { encoding: 'utf8' }));
	} catch (e) {
		return false;
	}
}

function writeJsonToProject(file, data, root) {
	const projectRoot = findProjectRoot(root);

	try {
		return fs.writeFileSync(path.join(projectRoot, file),
			JSON.stringify(data, null, 2),
			{ encoding: 'utf8' });
	} catch (e) {
		return false;
	}
}

function readPackageJson(root) {
	return readJsonFromProject('package.json', root);
}

function readDependencies(root) {
	const packageJson = readPackageJson(root);
	const packageLock = readJsonFromProject('package-lock.json', root);
	const npmShrinkwrap = readJsonFromProject('npm-shrinkwrap.json', root);

	let dependencies = {};
	let source;

	if (npmShrinkwrap) {
		source = 'npm-shrinkwrap.json';
		dependencies = npmShrinkwrap.dependencies;
	} else if (packageLock) {
		source = 'package-lock.json';
		dependencies = packageLock.dependencies;
	} else if (packageJson) {
		source = 'package.json';
		dependencies = Object.assign({},
			packageJson.devDependencies,
			packageJson.dependencies);
	}

	debug('Read', Object.keys(dependencies).length, 'dependencies from', source);

	return dependencies;
}

function writePackageJson(object, root) {
	writeJsonToProject('package.json', object, root);
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
	readPackageJson,
	writePackageJson,
	readJsonFromProject,
	writeJsonToProject,
	readDependencies,
	findValidatorRoot
};