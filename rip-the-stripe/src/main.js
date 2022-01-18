const puppeteer = require('puppeteer');
const {
	delay,
	UserAgent,
	loginSelector,
	chatWindowSelector,
	textEditorSelector,
	messagesSelector,
	lastMessageSelector,
	sendMessage,
	sendVideo,
} = require('./util');
const { start, guess, turnsLeft, state } = require('./hangman');

let ACTIVE = false;

async function main({ contact, turns, trigger, mode, vowels }) {
	try {
		// Initialize browser and page
		trigger = trigger.toUpperCase();
		const browser = await puppeteer.launch({
			headless: false,
			executablePath: process.env.CHROME_PATH,
		});
		const page = await browser.newPage();
		await page.setUserAgent(UserAgent);
		console.log('Initialized browser');

		// Open web client
		console.log('Opening WhatsApp');
		await page.goto('https://web.whatsapp.com/');
		console.log('Waiting for login');
		await page.waitForSelector(loginSelector);
		console.log('Logged in, wait for 5 seconds');
		await delay(5000);

		// Open chat window
		console.log('Opening chat - ' + contact);
		await page.click(`span[title='${contact}']`);
		await page.waitForSelector(chatWindowSelector);
		console.log('Chat opened, editor in focus');
		let lastMessage = '';

		while (true) {
			try {
				// Grab the latest message
				const latestMessage = await page.$(lastMessageSelector);
				const texty = await latestMessage.getProperty('textContent');
				let text = texty.toString();
				text = text.substring(9, text.length);

				// If the current latest message is same as before, continue
				if (text === lastMessage) continue;

				// If not, new message received

				// Log it
				lastMessage = text;
				console.log(lastMessage);

				text = text?.toUpperCase();
				// Check for trigger
				if (text.startsWith(trigger)) {
					const token = text.substring(
						trigger.length + 1,
						text.length,
					);
					if (!ACTIVE) {
						console.log('Not started yet');
						console.log('token = ' + token);
						if (token == 'START') {
							ACTIVE = true;
							const message = await start(trigger, vowels);
							await sendMessage(
								page,
								() =>
									message +
									'\n' +
									'🐼'.repeat(turnsLeft()) +
									'🤡'.repeat(turns - turnsLeft()),
							);
							await sendMessage(
								page,
								() =>
									`Reply with "${trigger} <letter>" to make a guess.`,
							);
						}
						continue;
					}
					if (ACTIVE) {
						const letter = token[0];
						const message = await guess(letter);
						console.log('Turns Left = ' + turnsLeft());
						console.log('State = ' + state());
						switch (mode) {
							case 'TEXT': {
								await sendMessage(
									page,
									() =>
										message +
										'\n' +
										'🐼'.repeat(turnsLeft()) +
										'🤡'.repeat(turns - turnsLeft()),
								);
								if (state() == 'PLAYING')
									await sendMessage(
										page,
										() =>
											`Reply with "${trigger} <letter>" to make a guess.`,
									);
								break;
							}
							case 'VIDEO': {
								await sendVideo(
									page,
									'' + turnsLeft(),
									() =>
										message +
										'\n' +
										'🐼'.repeat(turnsLeft()) +
										'🤡'.repeat(turns - turnsLeft()),
								);
								if (state() == 'PLAYING')
									await sendMessage(
										page,
										() =>
											`Reply with "${trigger} <letter>" to make a guess.`,
									);
								break;
							}
						}
					}
				}
				if (state() == 'WON' || state() == 'LOST') {
					ACTIVE = false;
					console.log('Game over');
				}
			} catch (error) {
				console.error('Error reading latest message. \n' + error);
				await delay(1000);
				continue;
			}

			await delay(50);
		}
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
	}
}

module.exports = main;
