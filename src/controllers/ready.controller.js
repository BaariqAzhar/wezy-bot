const moment = require('moment');
const chatIdOf = require('../helper/chatIdOf.js');
const { scheduleControllerPer1, scheduleControllerPer60 } = require('./schedule.controller.js');

const readyController = (client) => {
    const timeNow = moment().format('MMMM Do YYYY, HH:mm:ss');
    console.log('Client is ready!', timeNow);

    const text = `Hi Sir, I am back !!!! on ${timeNow}`;
    console.log('send :', text);
    client.sendMessage(chatIdOf('+6287738210702'), text);

    let alreadySent = false;

    setInterval(() => scheduleControllerPer1(client, alreadySent), 1000 * 60);

    setInterval(() => scheduleControllerPer60(client), 1000 * 60 * 60);
};

module.exports = readyController;
