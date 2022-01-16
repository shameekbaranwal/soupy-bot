const fs = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config();

class Hangman {
	constructor(turns, trigger) {
		this.STATE = 0; // 0 = waiting for word, 1 = playing, 2 = won, 3 = lost, 4 = repeated guess
		this.turns = turns;
		this.trigger = trigger;
		this.guessedLetters = []; // array of letters of the word guessed correctly
		this.word = '';
		this.guesses = []; // array of all guesses
		this.repeated = false; // whether the last guess was repeated
	}

	async pickWord() {
		try {
			const data = await fs.readFile(
				process.env.REPO_PATH +
					'soupy-bot\\rip-the-stripe\\src\\hangman\\words.txt',
				'utf8',
			);

			let words = data.split('\r\n');
			while (this.word.length < 5 || this.word.length > 6) {
				this.word = words[Math.floor(Math.random() * words.length)];
			}
			// for testing
			// this.word = 'hello';

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
			response += `\tYou already guessed the letter: ${this.latestGuess()}.\n\n`;
			this.repeated = false;
		} else {
			if (this.guesses.length > 0)
				response += `\tYou guessed : *${this.latestGuess()}*\n\n`;
		}

		if (this.STATE == 1)
			response += `\t\t${this.getGuessed()}\n\nYou have ${
				this.turns
			} turns left\nReply with "${
				this.trigger
			} <letter>" to make a guess!`;

		if (this.STATE == 2)
			response += `You won!\nThe word was ${this.word.join('')}`;

		if (this.STATE == 3)
			response += `You lost!\nThe word was ${this.word.join('')}`;

		return response;
	}

	// to get the current guessed word, with underscores in place of missing letters
	getGuessed() {
		let str = '';

		this.guessedLetters.forEach(letter => {
			if (letter) str += letter + ' ';
			else str += '- ';
		});

		return str;
	}

	// make the response say what the latest guess was, and if it was correct or not.
	guess(letter) {
		letter = letter.toUpperCase();

		if (this.guesses.includes(letter)) {
			this.repeated = true;
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
		this.updateState();
	}

	// runs after every guess, to check if the game is over
	updateState() {
		if (this.turns == 0) {
			this.STATE = 3;
		}

		let win = true;
		this.guessedLetters.forEach(letter => {
			if (!letter) win = false;
		});

		if (win) this.STATE = 2;
	}

	latestGuess() {
		return this.guesses[this.guesses.length - 1];
	}
}

module.exports = Hangman;
