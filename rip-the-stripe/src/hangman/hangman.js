const fs = require('fs').promises;

class Hangman {
	constructor(turns, trigger) {
		this.STATE = 0; // 0 = waiting for word, 1 = playing, 2 = won, 3 = lost, 4 = repeated guess
		this.turns = turns;
		this.trigger = trigger;
		this.guessedLetters = [];
		this.word = '';
		this.guesses = [];
		this.repeated = false;
	}

	async pickWord() {
		try {
			const data = await fs.readFile('./words.txt', 'utf8');

			let words = data.split('\r\n');
			while (this.word.length < 5 || this.word.length > 6) {
				this.word = words[Math.floor(Math.random() * words.length)];
			}
			this.word = 'hello';
			this.word = this.word.toUpperCase();
			// storing word as array for ease
			this.word = this.word.split('');
			// make the guessedLetters array full of empty strings
			this.guessedLetters = new Array(this.word.length).fill('');
			console.log(this.word.join(''));

			// after word is obtained, start game
			this.STATE = 1;
		} catch (err) {
			console.error("Couldn't pick a word\n", err);
			this.STATE = -1;
			return;
		}
	}

	getResponse() {
		let response = '';

		if (this.repeated) {
			response += `You already guessed the letter: ${this.lastGuess}.\n`;
			this.repeated = false;
		}

		if (this.STATE == 1)
			response += `\t\t${this.getGuessed()}\n\nYou have ${
				this.turns
			} turns left\nReply with "${
				this.trigger
			} <letter>" to make a guess!`;

		if (this.STATE == 2)
			response = `You won!\nThe word was ${this.word.join('')}`;

		if (this.STATE == 3)
			response = `You lost!\nThe word was ${this.word.join('')}`;

		return response;
	}

	getGuessed() {
		let str = '';

		this.guessedLetters.forEach(letter => {
			if (letter) str += letter;
			else str += '_';
		});

		return str;
	}

	// make the response say what the latest guess was, and if it was correct or not.
	guess(letter) {
		letter = letter.toUpperCase();

		if (this.guesses.includes(letter)) {
			repeated = true;
			this.guesses.push(letter);
			return;
		}

		let decrement = 1;
		this.word.forEach((ch, index) => {
			if (ch == letter) {
				this.guessedLetters[index] = letter;
				decrement = 0;
			}
		});
		// if the letter is not in the word, there is a turn cost
		this.guesses.push(letter);
		this.turns -= decrement;
		this.checkLost();
	}

	checkLost() {
		if (this.turns == 0) {
			this.STATE = 3;
		}

		let win = true;
		this.guessedLetters.forEach(letter => {
			if (!letter) win = false;
		});

		if (win) this.STATE = 2;
	}
}

module.exports = Hangman;
