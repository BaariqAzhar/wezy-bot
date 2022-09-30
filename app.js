const waConfig = require('./wa.config.json');
const qrcode = require('qrcode-terminal');
const HandyStorage = require('handy-storage');
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
const autoSendLength = waConfig?.autoSend?.length || 0;
let autoSendCount = [];
for (let index = 0; index < autoSendLength; index++) {
    autoSendCount.push(0);
}
storage.setState({
    ...storage.state,
    firstTime: true,
    log: {
        minutes: 0,
        hours: 0,
    },
    autoSendCount,
});

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

const readyController = require('./src/controllers/ready.controller.js');
client.on('ready', () => readyController(client, storage));

const messageController = require('./src/controllers/message.controller.js');
client.on('message', (message) => messageController(client, message));
