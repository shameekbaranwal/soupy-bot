const main = require('./src/main');
const { getRandomString } = require('./src/util');

const config = {
	contact: 'asdfg',
	num: 50,
	message: () => 'Your verification code is ' + getRandomString(7) + '.',
};

main(config);
