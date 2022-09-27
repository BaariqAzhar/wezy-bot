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
storage.setState({
    count: 0,
});

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

const readyController = require('./src/controllers/ready.controller.js');
client.on('ready', () => readyController(client));

const messageController = require('./src/controllers/message.controller.js');
client.on('message', (message) => messageController(client, message));
