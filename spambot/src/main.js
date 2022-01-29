const puppeteer = require('puppeteer');
const {
	delay,
	UserAgent,
	loginSelector,
	chatWindowSelector,
	textEditorSelector,
} = require('./util');

async function main({ contact, num, message }) {
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

		for (let i = 0; i < num; i++) {
			//select editor
			const inp = await page.$(textEditorSelector);
			//send message
			await inp.type(message());
			await page.keyboard.press('Enter');
			await delay(300);
			console.log('Sent ' + (i + 1) + ' times');
		}

		// Close browser
		console.log('Closing browser');
		await browser.close();
		console.log('Browser closed');
	} catch (error) {
		console.log('====================================');
		console.log(error);
		console.log('====================================');
	}
}

module.exports = main;
