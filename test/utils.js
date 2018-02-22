const path = require('path');
const utils = require('../lib/utils');

describe('findProjectRoot()', () => {
	test('returns the root of project1', () => {
		expect(utils.findProjectRoot(path.resolve(__dirname, 'fixtures/project1')))
			.toEqual(path.resolve(__dirname, 'fixtures/project1'));
	});

	test('returns the root of current project', () => {
		expect(utils.findProjectRoot())
			.toEqual(path.resolve(__dirname, '..'));
	});
});

describe('findValidatorRoot()', () => {
	test('returns the root of current project', () => {
		expect(utils.findValidatorRoot())
			.toEqual(path.resolve(__dirname, '..'));
	});

	test('returns the fixture root', () => {
		expect(utils.findValidatorRoot('asd'))
			.toEqual('asd');
	});
});