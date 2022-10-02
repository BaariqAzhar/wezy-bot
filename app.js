const waConfig = require('./wa.config.json');
const qrcode = require('qrcode-terminal');
const HandyStorage = require('handy-storage');
const createAutoSendData = require('./src/helper/createAutoSendData');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
});

// const { Client } = require("whatsapp-web.js");
// const client = new Client();

const storage = new HandyStorage({
    beautify: true,
});
storage.connect('./wa.storage.json');
storage.setState({
    ...storage.state,
    firstTime: true,
    log: {
        minutes: 0,
        hours: 0,
    },
    autoSendData: createAutoSendData(waConfig?.autoSend),
});

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

const readyController = require('./src/controllers/ready.controller.js');
client.on('ready', () => readyController(client, storage));

const messageController = require('./src/controllers/message.controller.js');
client.on('message', (message) => messageController(client, message));

// todo
// * O create big logic
// * O create logic for random message
// * O create logic for auto send with random hour and minute in range
// * O move & execute createAutoSendData on early main file
// * O make random message on state too
// * create based on date
