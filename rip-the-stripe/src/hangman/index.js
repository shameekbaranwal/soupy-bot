const Hangman = require('./hangman');

// obj.getResponse();

const play = async () => {
	let obj = new Hangman(5, 'hello');

	await obj.pickWord();
	console.log(obj.getResponse());
	obj.guess('l');
	console.log(obj.getResponse());
	obj.guess('o');
	console.log(obj.getResponse());
	obj.guess('a');
	console.log(obj.getResponse());
	obj.guess('h');
	console.log(obj.getResponse());
	obj.guess('i');
	console.log(obj.getResponse());
	obj.guess('x');
	console.log(obj.getResponse());
	obj.guess('x');
	console.log(obj.getResponse());
	obj.guess('y');
	console.log(obj.getResponse());
	obj.guess('i');
	console.log(obj.getResponse());
	obj.guess('z');
	console.log(obj.getResponse());
};

play();
