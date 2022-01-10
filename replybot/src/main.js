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

async function main({ contact, equals, contains, message }) {
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
		let lastMessage = 'random';

		while (true) {
			try {
				const latestMessage = await page.$(lastMessageSelector);
				const texty = await latestMessage.getProperty('textContent');
				let text = texty.toString();
				text = text.substring(9, text.length);

				if (text === lastMessage) {
					continue;
				} else {
					lastMessage = text;
					console.log(lastMessage);
					if (
						(equals && lastMessage === equals) ||
						(contains && lastMessage.includes(contains))
					)
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
