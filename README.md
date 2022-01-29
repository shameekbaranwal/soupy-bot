# soupy-bot

This repo contains two bots for automating simple functionalities on WhatsApp.

## Instructions to run the bot locally:

1. Make a `.env` file in the root of the repository, and create a variable `ROOT_PATH` containing the location of the parent folder of the clone of the repo on your local machine.

```sh
    Example:
    REPO_PATH="C:\\Users\\<username>\\Desktop\\Repositories\\"
```

2. Create another variable named `CHROME_PATH` containing the location of the executable `chrome.exe` to launch Google Chrome on your local machine, and paste it in the .env file.

```sh
    Example:
    CHROME_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
```

3. In your terminal, run the following command to install all dependencies:

```sh
    npm i
```

You can use any of the three bots, as they all have different functionalities.

---

## 1. spambot

This bot can be used to spam some static or dynamically generated text to a contact a certain number of times.  
Open `spambot/index.js` to edit the contact name, number, and the message function in the `config` object, and then run it using the following command:

    node spambot

---

## 2. replybot

This bot can be used to reply to a specific trigger phrase in a chat with some static or dynamically generated text.  
Open `replybot/index.js` to edit the contact name, and the _equals_ and _contains_ properties for the triggering incoming message.  
Currently, the bot fetches an insult from the roast generator API at `https://evilinsult.com/api`. You can integrate a different API by modifying the `src/api.js` file.  
Once done, run the bot using the following command:

    node replybot

---

## 3. hangbot

This bot allows a contact to play a version of popular word-guessing game - [Hangman](<https://en.wikipedia.org/wiki/Hangman_(game)>) - within your chatbox.  
The rules are simple, when the bot is turned on, it starts polling the messages, and as soon as it observes the currently set trigger - `bot start`, it starts the game.  
Upon encountering this message, it picks a random word, and allows the user `5` turns to guess all letters of the word.

You can toggle the `vowels` flag in `/hangbot/index.js` to control whether you want any vowels already guessed before the game starts. This flag can be used to lower the difficulty of the game.

The default mode is `TEXT`, but there is a special `VIDEO` mode available, which I made as a prank on my friend.  
Try it out to see what it does :)

To run the bot, first set the appropriate contact name, trigger phrase, number of turns, vowels flag, and mode for the bot in `/hangbot/index.js`, and then start the bot using the following command:

```sh
    node hangbot
```

---
