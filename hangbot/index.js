const main = require('./src/main');

const config = {
	contact: 'soup | yetserday',
	trigger: 'bot',
	turns: 5,
	mode: 'TEXT', //or 'VIDEO'
	vowels: true, //to control whether to pre-guess 2 vowels or not, basically a bodged way to control difficulty level of the game
};

main(config);
