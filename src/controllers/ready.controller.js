const moment = require('moment');
const chatIdOf = require('../helper/chatIdOf.js');
const { scheduleControllerPer1, scheduleControllerPer60 } = require('./schedule.controller.js');
const waConfig = require('../../wa.config.json');

const generateRandom = (min = 0, max = 10) => {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
};

const randomTime = (time) => {
    if (!time.includes('-')) {
        return time;
    }

    const timeSplit = time.split('-');
    const timeStart = timeSplit[0];
    const timeEnd = timeSplit[1];

    const timeStartSplit = timeStart.split(':');
    const timeStartHour = Number(timeStartSplit[0]);
    const timeStartMinute = Number(timeStartSplit[1]);

    const timeEndSplit = timeEnd.split(':');
    const timeEndHour = Number(timeEndSplit[0]);
    const timeEndMinute = Number(timeEndSplit[1]);

    const hour = generateRandom(timeStartHour, timeEndHour);
    let minute = generateRandom(0, 59);

    if (hour === timeEndHour && minute > timeEndMinute) {
        minute = 0;
    }

    const textHour = hour < 10 ? `0${hour}` : hour;
    const textMinute = minute < 10 ? `0${minute}` : minute;

    return `${textHour}:${textMinute}`;
};

const readyController = (client, storage) => {
    const timeNow = moment().format('MMMM Do YYYY, HH:mm:ss');
    console.log('Client is ready!', timeNow);

    if (waConfig?.configuration?.masterNumber) {
        const text = `Hi Sir, I am back !!!! on ${timeNow}`;
        console.log('send :', text);
        client.sendMessage(chatIdOf(waConfig?.configuration?.masterNumber), text);
    }

    let autoSendData = [...(waConfig?.autoSend || [])];
    if (waConfig?.autoSend.length > 0) {
        autoSendData = autoSendData.map((item) => {
            return {
                ...item,
                time: randomTime(item.time),
            };
        });
    }
    console.log('autoSendData :', autoSendData);

    setInterval(() => scheduleControllerPer1(client, storage, autoSendData), 1000 * 60);

    setInterval(() => scheduleControllerPer60(client), 1000 * 60 * 60);
};

module.exports = readyController;
