# soupy-bot

This repo contains two bots for automating simple functionalities on WhatsApp.

## 1. spambot

Open `spambot/index.js` to edit the contact name, frequency, and the message function in the `config` object, and then run it using the following command:

> `node spambot`

## 2. replybot

Open `replybot/index.js` to edit the contact name, and the _equals_ and _contains_ properties for the triggering incoming message. You can also integrate a different API by modifying the `src/api.js` file. Once done, run the bot using the following command:

> `node replybot`
