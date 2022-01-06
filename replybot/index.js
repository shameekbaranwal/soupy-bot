const main = require('./src/main');
const { getRandomString } = require('./src/util');

const config = {
	contact: 'Vaidehi Baranwal',
	equals: '7',
	contains: '',
	message: () => 'botreply ' + getRandomString(5),
};

main(config);
