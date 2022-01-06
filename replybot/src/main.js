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
			const messages = await page.$(messagesSelector);
			if (messages) {
				const latestMessage = await page.$(lastMessageSelector);
				const text = await latestMessage.getProperty('textContent');

				if (text === lastMessage) {
					continue;
				} else {
					lastMessage = text;
					if (
						(equals && lastMessage.equals(equals)) ||
						(contains && lastMessage.includes(contains))
					)
						await sendMessage(page, message);
				}
			}

			await delay(100);
		}
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
	}
}

module.exports = main;
