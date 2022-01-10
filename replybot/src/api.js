const axios = require('axios');

const getInsult = async () => {
	try {
		const response = await axios.get(
			'https://evilinsult.com/generate_insult.php?lang=en',
		);
		return response.data;
	} catch (e) {
		console.error(e);
		throw new Error('ooga booga');
	}
};

// getInsult();

module.exports = getInsult;
