const moment = require('moment');
const chatIdOf = require('../helper/chatIdOf');

const scheduleControllerPer60 = (client) => {
    const now = moment().format('HH:mm:ss');
    const text = `I am still alive, Sir on ${now}`;

    console.log('send : ', text);
    client.sendMessage(chatIdOf('+6287738210702'), text);
};

const scheduleControllerPer1 = () => {
    const now = moment().format('HH:mm:ss');
    // const nowHour = moment().format('HH');
    // const nowMinute = moment().format('mm');
    // const nowSecond = moment().format('ss');

    console.log('log at : ', now);
};

module.exports = { scheduleControllerPer1, scheduleControllerPer60 };
