const main = require('./src/main');
const { getRandomString } = require('./src/util');

const config = {
	contact: '+91 73793 77666',
	num: 15,
	message: () => 'lmao' + getRandomString(15),
};

main(config);
