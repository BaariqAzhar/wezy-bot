const moment = require('moment');
const chatIdOf = require('../helper/chatIdOf');
const waConfig = require('../../wa.config.json');
const createAutoSendData = require('../helper/createAutoSendData');

const scheduleControllerPer60 = (client) => {
    const now = moment().format('HH:mm:ss');
    const text = `I am still alive, Sir at ${now}`;

    console.log('send : ', text);
    client.sendMessage(chatIdOf('+6287738210702'), text);
};

const scheduleControllerPer1 = (client, storage) => {
    const nowHour = moment().format('HH');
    const nowMinute = moment().format('mm');
    const nowSecond = moment().format('ss');
    const now = `${nowHour}:${nowMinute}:${nowSecond}`;
    const nowHHmm = `${nowHour}:${nowMinute}`;

    console.log('log at : ', now);
    storage.setState({
        ...storage.state,
        log: {
            ...storage.state.log,
            minutes: storage.state.log.minutes + 1,
        },
    });

    let autoSendData = storage.state?.autoSendData || [];
    if (now === '00:03') {
        let tempAutoSendData = createAutoSendData(waConfig?.autoSend) || [];

        storage.setState({
            ...storage.state,
            ...tempAutoSendData,
        });
        console.log('created new autoSendData : ', tempAutoSendData);
    }

    if (autoSendData.length > 0) {
        for (const i in autoSendData) {
            if (autoSendData[i].time === nowHHmm) {
                console.log('send : ', autoSendData?.[i]?.message);
                client.sendMessage(chatIdOf(autoSendData?.[i]?.no), autoSendData?.[i]?.message);
            }
        }
    }
};

module.exports = { scheduleControllerPer1, scheduleControllerPer60 };
