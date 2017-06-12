// app/config/database.js
// Just return the model export for the port of the MongoDB.

const config = {
	'url' : 'mongodb://127.0.0.1:27017/communicode',
	'redis': {
		'host': '127.0.0.1',
		'port': '6379'
	}
};

export default config;
