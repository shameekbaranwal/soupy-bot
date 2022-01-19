const fs = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config();

class Hangman {
	constructor(turns, trigger, vowels) {
		this.STATE = 0; // 0 = waiting for word, 1 = playing, 2 = won, 3 = lost, 4 = repeated guess
		this.turns = turns;
		this.trigger = trigger;
		this.guessedLetters = []; // array of letters of the word guessed correctly
		this.word = '';
		this.guesses = []; // array of all guesses
		this.repeated = false; // whether the last guess was repeated
		this.vowels = vowels; // whether there are going to be any pre-guessed vowels.
		this.preGuesses = 2; // number of guesses before the first guess by the player. Essentially, how many hints the player gets.
	}

	async pickWord() {
		try {
			const data = await fs.readFile(
				process.env.REPO_PATH +
					'soupy-bot\\hangbot\\src\\hangman\\words.txt',
				'utf8',
			);

			let words = data.split('\r\n');
			while (this.word.length < 6 || this.word.length > 7) {
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

			// guess the vowels first
			if (this.vowels) {
				// guess any two vowels
				const v = ['A', 'E', 'I', 'O', 'U'];
				const shuffled = v.sort(() => 0.5 - Math.random());
				for (let i = 0; i < this.preGuesses; i++)
					this.guess(shuffled[i], true);
			}
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
			if (this.guesses.length > (this.vowels ? this.preGuesses : 1))
				//5 because the first 5 guesses are vowels
				response += `\tYou guessed : *${this.latestGuess()}*\n\n`;
		}

		if (this.STATE == 1) {
			response += `\t\t${this.getGuessed()}\n\nYou have ${
				this.turns
			} turns left`;
			response += `\nYou've already guessed: ${this.guesses.join(
				', ',
			)}\n`;
		}

		if (this.STATE == 2)
			response += `You won!\nThe word was ${this.word.join('')}\nSend "${
				this.trigger
			} start" to restart the game.`;

		if (this.STATE == 3)
			response += `You lost!\nThe word was ${this.word.join('')}\nSend "${
				this.trigger
			} start" to restart the game.`;

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
	guess(letter, flag) {
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
		if (flag) return;
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
