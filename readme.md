# Wezy Bot 🦾😸

**Whatsapp Bot with Eazy Configuration**

Do you want to automate your Whatsapp messages?

Sending a message / remind to someone every day but too lazy to do it over and over again. Or reply the messages automatically

## Tech Stack 🛠

**Backend** NodeJS, whatsapp-web.js, Puppeteer, qrcode-terminal, handy-storage, etc

## Run Locally 🏃‍♂️

**Requirements** NodeJs

Clone the project

```bash
  git clone (url)
```

Go to the project directory

```bash
  cd (folder name)
```

Install dependencies

```bash
  npm i
```

Make custom configuration (example at wa.config.example.json)

```bash
  change on wa.config.json
```

Start the server

```bash
  node app.js
```

Scan the barcode

Finally your bot has been launch 🚀🚀🚀

## How to custom the configuration

This is a quick example of using Wezy bot

### Example of wa.config.json

```jsonc
{
    "configuration": {
        "masterNumber": "+6287700000000",
        "botNumber": "+6287700000001"
    },
    "autoSend": [
        {
            "time": "08:00",
            "message": "Good morning",
            "no": "+6287700000002"
        },
        {
            "time": "12:00-13:00",
            "message": "Good afternoon",
            "no": "+6287700000002"
        },
        {
            "time": "18:00",
            "message": ["Good evening", "Don't forget to get dinner"],
            "no": "+6287700000002"
        },
        {
            "time": "21:00-22:00",
            "message": ["Good night", "Thank you for today, please take a rest", "Have a nice dream"],
            "no": "+6287700000002"
        },
        {
            "date": "23 Jun",
            "time": "05:00",
            "message": "Happy birthday, Hope all your birthday wishes come true!",
            "no": "+6287700000002"
        }
    ],
    "reply": [
        {
            "message": ["Hi", "Hello", "Uy uy", "Hayya"],
            "reply": ["Hi", "Hello", "Uy uy", "Hayya"]
        },
        {
            "message": "How are you?",
            "reply": "I'm fine, thank you"
        },
        {
            "message": ["What's your name?", "what is your name?", "who are you?"],
            "reply": "My name is Erieri build by Wezy-bot"
        },
        {
            "message": ["Siapa kamu?", "Siapa nama kamu?", "Siapa nama lu?"],
            "reply": "Aku Erieri, bot yang dibuat menggunakan Wezy-bot"
        }
    ]
}
```

### Properties

#### configuration

Setup your bot

| Name         | Type   | Description                                          |
| ------------ | ------ | ---------------------------------------------------- |
| masterNumber | string | Your number                                          |
| botNumber    | string | Your bot number (could be same with your number too) |

#### autoSend

Feature of sending messages by time

| Name    | Type              | Description                                                                 |
| ------- | ----------------- | --------------------------------------------------------------------------- |
| date    | string (optional) | Using DD MMM format, send on specific date                                  |
| time    | string            | Using 24 H format, can be specific hours or choose random in the time range |
| message | string/string[]   | Message you want to send, can be fixed message or random message            |
| no      | string            | Target number                                                               |

#### reply

Feature of sending reply because of incoming message text

| Name    | Type            | Description                                                     |
| ------- | --------------- | --------------------------------------------------------------- |
| message | string/string[] | Trigger text on incoming message                                |
| reply   | string/string[] | Reply that you want to send, can be fixed reply or random reply |
