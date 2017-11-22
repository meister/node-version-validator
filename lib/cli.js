const Table = require('cli-table');

function table(head, body) {
	const table = new Table({ head });

	body.forEach(row => {
		table.push(row);
	});

	return table.toString();
}

module.exports = {
	table
};