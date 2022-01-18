const Hangman = require('./hangman');
let game = null;

const start = async (trigger, vowels) => {
	game = new Hangman(5, trigger, vowels);
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
	switch (game?.STATE) {
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
