const moment = require('moment');
const chatIdOf = require('../helper/chatIdOf');
const waConfig = require('../../wa.config.json');
const createAutoSendData = require('../helper/createAutoSendData');
const groupIdOf = require('../helper/groupIdOf');

const scheduleControllerPer60 = (client) => {
    if (waConfig?.configuration?.masterNumber) {
        const now = moment().format('HH:mm:ss');
        const text = `I am still alive, Sir at ${now}`;
        console.log('send :', text);
        client.sendMessage(chatIdOf(waConfig?.configuration?.masterNumber), text);
    }
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
    if (nowHHmm === '00:00') {
        let tempAutoSendData = createAutoSendData(waConfig?.autoSend) || [];

        storage.setState({
            ...storage.state,
            autoSendData: tempAutoSendData,
        });
        console.log('created new autoSendData at : ', now);
    }

    if (autoSendData.length > 0) {
        for (const i in autoSendData) {
            if (autoSendData[i].time === nowHHmm) {
                if (autoSendData?.[i]?.no) {
                    console.log('send : ', autoSendData?.[i]?.no, ' => ', autoSendData?.[i]?.message);
                    client.sendMessage(chatIdOf(autoSendData?.[i]?.no), autoSendData?.[i]?.message);
                } else if (autoSendData?.[i]?.group) {
                    console.log('send : ', autoSendData?.[i]?.group, ' => ', autoSendData?.[i]?.message);
                    client.sendMessage(groupIdOf(autoSendData?.[i]?.group), autoSendData?.[i]?.message);
                }
            }
        }
    }
};

module.exports = { scheduleControllerPer1, scheduleControllerPer60 };
