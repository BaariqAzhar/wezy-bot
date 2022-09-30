const moment = require('moment');
const chatIdOf = require('../helper/chatIdOf');
const waConfig = require('../../wa.config.json');
const randomRangeTime = require('../helper/randomRangeTime.js');

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
    if (storage.state?.firstTime || now === '00:00') {
        let tempAutoSendData = waConfig?.autoSend || [];
        tempAutoSendData = tempAutoSendData.map((item) => {
            if (!item?.time.includes('-')) return item;

            return {
                ...item,
                time: randomRangeTime(item?.time),
            };
        });

        storage.setState({
            ...storage.state,
            firstTime: false,
            autoSendData: tempAutoSendData,
        });
        console.log('created new autoSendData : ', tempAutoSendData);
    }

    if (autoSendData.length > 0) {
        for (const i in autoSendData) {
            if (autoSendData[i].time === nowHHmm) {
                if (Array.isArray(autoSendData?.[i]?.message)) {
                    const messageLength = autoSendData?.[i]?.message?.length;
                    const randomIndex = Math.floor(Math.random() * messageLength);
                    const messageText = autoSendData?.[i]?.message?.[randomIndex];
                    console.log('send : ', messageText);
                    client.sendMessage(chatIdOf(autoSendData?.[i]?.no), messageText);
                } else {
                    console.log('send : ', autoSendData?.[i]?.message);
                    client.sendMessage(chatIdOf(chatIdOf(autoSendData?.[i]?.no)), autoSendData?.[i]?.message);
                }
                const tempAutoSend = storage.state.autoSend;
                tempAutoSend[Number(i)] = storage.state?.autoSend?.[Number(i)] + 1;
                storage.setState({
                    ...storage.state,
                    autoSend: tempAutoSend,
                });
            }
        }
    }
};

module.exports = { scheduleControllerPer1, scheduleControllerPer60 };
