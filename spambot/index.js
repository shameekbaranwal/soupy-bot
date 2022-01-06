const main = require('./src/main');
const {getRandomString} = require('./src/util');

const config = {
	contact: "Vaidehi Baranwal",
	num: 15,
	message: () => "lmao" + getRandomString(15),
}

main(config);