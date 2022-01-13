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
} = require('./util');

let STATE = false;

async function main({ contact, turns, trigger }) {
	try {
		// Initialize browser and page
		const browser = await puppeteer.launch({ headless: false });
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

				// Check for trigger
				if (text.startsWith(trigger)) {
					// If ACTIVE == 0, then start the game
					// 		Create a new object of the game with turns
					// Else
					// 		Pass the value of lastMessage to the game object
					// 		Grab the response of the game from the object
					// 		Paste appropriate image with appropriate caption
					// 		Send the response
					const message = `
					__C_
					You have ${turns} turns left.`;
					await sendMessage(page, message);
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
