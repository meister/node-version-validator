const path = require('path');
const versions = require('../lib/versions');

describe('readConfiguration()', () => {
	test('returns the fixture from project1', () => {
		expect(versions.readConfiguration(path.resolve(__dirname, 'fixtures/validator1')))
			.toEqual({
				supported: {
					a: '>=3.0.1-2',
					b: '>=1.2'
				}
			});
	});

	test('returns the contents of actual versions', () => {
		const actual = require(path.resolve(__dirname, '..', 'versions.json'));

		expect(versions.readConfiguration()).toEqual(actual);
	});
});

describe('listSupported()', () => {
	let spy;

	beforeEach(() => {
		spy = jest.spyOn(versions, 'readConfiguration').mockImplementation(() => {
			versions.configuration = {
				supported: {
					a: 1
				}
			};
		});
	});

	afterEach(() => {
		spy.mockReset();
		spy.mockRestore();
	});

	test('returns supported versions', () => {
		versions.configuration = false;

		expect(versions.listSupported())
			.toEqual({
				a: 1
			});

		expect(spy).toHaveBeenCalledTimes(1);
	});

	test('returns cached configuration when it has been loaded', () => {
		versions.configuration = {
			supported: {
				b: 10
			}
		};

		expect(versions.listSupported())
			.toEqual({
				b: 10
			});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});