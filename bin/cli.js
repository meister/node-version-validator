#!/usr/bin/env node
const {
		print,
		findProjectRoot,
		findValidatorRoot
	} = require('../lib/utils');
const versions = require('../lib/versions');
const cli = require('../lib/cli');

require('yargs')
	.usage('Usage: $0 <command> [options]')
	.command(['list'], 'List supported versions', () => {},
		() => {
			process.exit(listVersions());
		})
	.command(['$0', 'validate'], 'Validate package.json against supported versions',
		(yargs) => {
			if (yargs.argv.debug) {
				printDebug();
			}
		},
		() => {
			process.exit(validateVersions());
		})
	.option('debug', {
		alias: 'x',
		default: false,
		describe: 'Print debug messages'
	})
	.help('h')
	.alias('h', 'help')
	.argv;

function printDebug() {
	print(`Your project root is ${cli.highlight(findProjectRoot())}.`);
	print(`Validator root is ${cli.highlight(findValidatorRoot())}.\n`);
}


function listVersions() {
	print(cli.highlight(`List supported versions`));
	print(cli.buildTable(['Package', 'Supported Versions'], versions.listSupported()));

	return 0;
}

function validateVersions() {
	let list = versions.listOutdated();

	print(cli.highlight(`List of outdated versions`));

	if (Object.keys(list).length === 0) {
		print(cli.success('Everything is up-to-date.'));

		return 0;
	}

	print(cli.buildTable(
		['Package', 'Current version', 'Supported versions'],
		['$key', 'current', 'supported'],
		list
	));

	return 1;
}