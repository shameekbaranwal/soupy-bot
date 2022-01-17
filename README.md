# soupy-bot

This repo contains two bots for automating simple functionalities on WhatsApp.

## 1. spambot

Open `spambot/index.js` to edit the contact name, frequency, and the message function in the `config` object, and then run it using the following command:

    node spambot

---

---

## 2. replybot

Open `replybot/index.js` to edit the contact name, and the _equals_ and _contains_ properties for the triggering incoming message. You can also integrate a different API by modifying the `src/api.js` file. Once done, run the bot using the following command:

    node replybot

---

---

## 3. rip-the-stripe

Steps to run the bot:

1. Make a `.env` file in the root of the repository, and create a variable `ROOT_PATH` containing the location of the parent folder of the clone of the repo on your local machine.

---

    Example:
    REPO_PATH="C:\\Users\\<username>\\Desktop\\Repositories\\"

---

2. Create another variable named `CHROME_PATH` containing the location of the executable `chrome.exe` to launch Google Chrome on your local machine, and paste it in the .env file.

---

    Example:
    CHROME_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"

---

2. In your terminal, run the following command to install all dependencies:

---

    npm i

---

3. Finally, set the appropriate contact name and trigger for the bot in `/rip-the-stripe/index.js`, and run the bot using the following command:

---

    node rip-the-stripe/

---

---
