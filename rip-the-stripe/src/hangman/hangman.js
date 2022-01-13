const fs = require('fs');

class Hangman {
	constructor(turns, trigger) {
		this.STATE = 0; // 0 = waiting for word, 1 = playing
		this.turns = turns;
		this.trigger = trigger;
		this.word = this.pickWord();
		this.guessedLetters = [];
		this.gameOver = false;
	}

	pickWord() {
		fs.readFile('./words.txt', 'utf8', (err, data) => {
			if (err) {
				console.error("Couldn't pick a word\n", err);
				return;
			}

			let words = data.split('\n');
			while (this.word.length < 5 || this.word.length > 6) {
				this.word = words[Math.floor(Math.random() * words.length)];
			}
			this.word = this.word.toLowerCase();
			// storing word as array for ease
			this.word = this.word.split('');
			// make the guessedLetters array full of empty strings
			this.guessedLetters = new Array(this.word.length).fill('');

			// after word is obtained, start game
			this.STATE = word.length;
		});
	}

	getResponse() {
		return `${this.getGuessed()}\n You have ${
			this.turns
		} turns left\nReply with "${trigger} <letter>" to make a guess!`;
	}

	getGuessed() {
		let str = '';

		this.guessedLetters.forEach(letter => {
			if (!letter) str += letter;
			else str += '_';
		});

		return str;
	}

	guess(letter) {
		this.word.forEach((ch, index) => {
			if (ch == letter) {
				this.guessedLetters[index] = letter;
			}
		});
		this.checkWin();
	}

	checkWin() {
		let win = true;
		this.guessedLetters.forEach(letter => {
			if (!letter) win = false;
		});

		if (win) {
			this.gameOver = true;
			this.STATE = 2;
		}
	}
}

module.exports = Hangman;
