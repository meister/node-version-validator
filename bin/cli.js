#!/usr/bin/env node
const { print, findProjectRoot } = require('../lib/utils');
const versions = require('../lib/versions');
const cli = require('../lib/cli');
const clc = require('cli-color');
const highlight = clc.yellow;

print(`Your project root is ${highlight(findProjectRoot())}.`);
print(cli.table(['Package', 'Supported Versions'], versions.listSupported()));