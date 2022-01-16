const main = require('./src/main');
const { getRandomString } = require('./src/util');
// const getInsult = require('./src/api.js');

const config = {
	contact: '+91 73793 77666',
	trigger: 'bot',
	turns: 5,
};

main(config);
