const dotenv = require('dotenv');
dotenv.config();

function delay(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), time);
	});
}

function getRandomString(num) {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let str = '';
	for (let i = 0; i < num; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

const UserAgent =
	'User Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

const loginSelector = '._1RAKT';

const chatWindowSelector = '._13NKt';

const textEditorSelector =
	'#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text';

const messagesSelector = '._2wUmf';

const lastMessageSelector =
	'._2wUmf:last-child > div > div > div > div > div > span.i0jNr.selectable-text.copyable-text > span';

const captionEditorSelector =
	'#app > div._1ADa8._3Nsgw.app-wrapper-web.font-fix.os-win > div._1XkO3.two > div._3ArsE > div.ldL67._3sh5K > span > div._1N4rE > span > div:nth-child(1) > div > div.KPJpj._2M_x0 > div > div._2SXhH > div.UJ-0N > div > div.p357zi0d.ktfrpxia.nu7pwgvd.fhf7t426.sap93d0t.r15c9g6i._1VmmK > div._1UWac.Z2O8p.oHEu9 > div._13NKt';

const attachmentsButton = `#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._3HQNh._1un-p > div._2jitM > div > div`;

const mediaInput =
	'#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._3HQNh._1un-p > div._2jitM > div > span > div._3iTtj > div > ul > li:nth-child(1) > button > input[type=file]';

const sendMessage = async (page, message) => {
	const inp = await page.$(textEditorSelector);
	let msg = '';

	try {
		msg = await message();
		const lines = msg.split('\n');
		for (let i = 0; i < lines.length; i++) {
			await inp.type(lines[i]);
			// await page.keyboard.press('Enter');
			await page.keyboard.down('ShiftLeft');
			await page.keyboard.press('Enter');
			await page.keyboard.up('ShiftLeft');
		}
	} catch (e) {
		console.error(e);
		msg = '*_bot_* : oopsiedoodle';
		await inp.type(msg);
	}

	await page.keyboard.press('Enter');
};

const sendCaption = async (page, message) => {
	const inp = await page.$(textEditorSelector);
	let msg = '';

	try {
		msg = await message();
		const lines = msg.split('\n');
		for (let i = 0; i < lines.length; i++) {
			await inp.type(lines[i]);
			// await page.keyboard.press('Enter');
			await page.keyboard.down('ShiftLeft');
			await page.keyboard.press('Enter');
			await page.keyboard.up('ShiftLeft');
		}
	} catch (e) {
		console.error(e);
		msg = '*_bot_* : oopsiedoodle';
		await inp.type(msg);
	}

	await page.keyboard.press('Enter');
};

const uploadFile = async (page, file) => {
	const fileInput = await page.$(mediaInput);
	await fileInput.uploadFile(file);
};

const getVideo = turnsLeft => {
	// return 'C:\\Users\\shame\\Desktop\\code\\Repositories\\soupy-bot\\rip-the-stripe\\src\\assets\\4.mp4';
	// return `./assets/${turnsLeft}.mp4`;
	return (
		process.env.REPO_PATH +
		'soupy-bot\\rip-the-stripe\\src\\assets\\' +
		turnsLeft +
		'.mp4'
	);
};

const sendVideo = async (page, turnsLeft, caption) => {
	await page.click(attachmentsButton);
	console.log('Clicked the button');
	await page.waitForSelector(mediaInput);
	console.log('Waited for mediainput selector');
	await uploadFile(page, getVideo(turnsLeft));
	console.log('Uploaded file');
	await delay(2000);
	await page.waitForSelector(captionEditorSelector);
	await sendCaption(page, caption);
	console.log('Wrote caption and sent video');
};

module.exports = {
	delay,
	getRandomString,
	UserAgent,
	loginSelector,
	chatWindowSelector,
	textEditorSelector,
	messagesSelector,
	lastMessageSelector,
	sendMessage,
	sendVideo,
};
