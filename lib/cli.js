const Table = require('cli-table');
const clc = require('cli-color');
const highlight = clc.yellow;
const error = clc.red;
const success = clc.green;
const muted = clc.xterm(248);

const internal = {
	parseString: (obj) => {
		if (typeof obj === 'string') {
			return obj;
		} else if (obj.error) {
			return error(obj.text);
		} else if (obj.warning) {
			return highlight(obj.text);
		} else if (obj.success) {
			return success(obj.text);
		} else if (obj.note) {
			return `${obj.text} ${muted(`(${obj.note})`)}`;
		}

		return obj.text;
	},

	parseRow: (schema, obj) => schema.map(key => internal.parseString(obj[key])),

	table: (head, body) => {
		const table = new Table({ head });

		body.forEach(row => {
			table.push(row);
		});

		return table.toString();
	}
};

function buildTable(head, schema, data) {
	// Re-map tableObject(head, data) to use default schema for {key: 'val'}
	if (!Array.isArray(schema)) {
		data = schema;
		schema = ['$key', '$val'];
	}

	const body = [];

	for (let key in data) {
		let rowData = {
			$key: key,
			$val: String(data[key])
		};

		if (typeof data[key] !== 'string') {
			Object.assign(rowData, data[key]);
		}

		body.push(internal.parseRow(schema, rowData));
	}

	return internal.table(head, body);
}

module.exports = {
	clc,
	buildTable,
	highlight,
	error,
	success,
	muted,
	_internal: internal
};