#!/usr/bin/env node
const utils = require('../lib/utils');
const clc = require('cli-color');
const highlight = clc.yellow;

utils.print(`Your project root is ${highlight(utils.findProjectRoot())}.`);