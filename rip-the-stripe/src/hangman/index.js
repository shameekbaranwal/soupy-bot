const Hangman = require('./hangman');

// obj.getResponse();

// const play = async () => {
// 	let obj = new Hangman(5, 'hello');

// 	await obj.pickWord();
// 	console.log(obj.getResponse());
// 	obj.guess('l');
// 	console.log(obj.getResponse());
// 	obj.guess('o');
// 	console.log(obj.getResponse());
// 	obj.guess('a');
// 	console.log(obj.getResponse());
// 	obj.guess('h');
// 	console.log(obj.getResponse());
// 	obj.guess('i');
// 	console.log(obj.getResponse());
// 	obj.guess('x');
// 	console.log(obj.getResponse());
// 	obj.guess('x');
// 	console.log(obj.getResponse());
// 	obj.guess('y');
// 	console.log(obj.getResponse());
// 	obj.guess('i');
// 	console.log(obj.getResponse());
// 	obj.guess('z');
// 	console.log(obj.getResponse());
// };

let game = null;

const start = async trigger => {
	game = new Hangman(5, trigger);
	await game.pickWord();
	console.log(game.word.join(''));
	return game.getResponse();
};

const guess = guess => {
	game.guess(guess);
	return game.getResponse();
};

const turnsLeft = () => {
	return game.turns;
};

const state = () => {
	switch (game.STATE) {
		case 0:
			return 'WAITING FOR WORD';
		case 1:
			return 'PLAYING';
		case 2:
			return 'WON';
		case 3:
			return 'LOST';
		default:
			return 'ERROR';
	}
};

// play();

module.exports = { guess, start, turnsLeft, state };
