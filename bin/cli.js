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
			listVersions();
		})
	.command(['$0', 'validate'], 'Validate package.json against supported versions',
		(yargs) => {
			if (yargs.argv.debug) {
				printDebug();
			}
		},
		() => {
			validateVersions();
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
}

function validateVersions() {
	print(cli.highlight(`List of outdated versions`));
	print(cli.buildTable(
		['Package', 'Current version', 'Supported versions'],
		['$key', 'current', 'supported'],
		versions.listOutdated()
	));
}