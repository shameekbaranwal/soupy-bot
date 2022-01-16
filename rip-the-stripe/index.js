const main = require('./src/main');
const { getRandomString } = require('./src/util');
// const getInsult = require('./src/api.js');

const config = {
	contact: 'Khushii',
	trigger: 'bot',
	turns: 5,
};

main(config);
