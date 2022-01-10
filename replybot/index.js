const main = require('./src/main');
const { getRandomString } = require('./src/util');
const getInsult = require('./src/api.js');

const config = {
	contact: 'soup | phee',
	equals: '7',
	contains: '',
	// message: () =>
	// 	new Promise(resolve => resolve('*_bot_* : ' + getRandomString(5))),
	message: async () => {
		const msg = await getInsult();
		return msg;
	},
};

main(config);
