
function delay(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), time);
	})	
}

function getRandomString(num) {
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let str = "";
	for (let i = 0; i < num; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

const UserAgent = "User Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"

const loginSelector = "._1RAKT";

const chatWindowSelector = '._13NKt';

const textEditorSelector = "#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text";

module.exports = {
	delay,
	getRandomString,
	UserAgent,
	loginSelector,
	chatWindowSelector,
	textEditorSelector
}