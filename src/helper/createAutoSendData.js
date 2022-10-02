const moment = require('moment');
const getRandom = require('./getRandom');
const getRandomRangeTime = require('./getRandomRangeTime');

const createAutoSendData = (data) => {
    if (data?.length === 0) return [];

    const tempAutoSendData = [];

    for (const item of data) {
        if (item?.date) {
            const nowDate = moment().format('DD');
            const nowMonth = moment().format('MMM');
            const now = `${nowDate} ${nowMonth}`;
            if (now.includes(item?.date)) {
                tempAutoSendData.push({
                    ...item,
                    time: item?.time.includes('-') ? getRandomRangeTime(item?.time) : item?.time,
                    message: Array.isArray(item?.message) ? getRandom(item?.message) : item?.message,
                });
            }
        } else {
            tempAutoSendData.push({
                ...item,
                time: item?.time.includes('-') ? getRandomRangeTime(item?.time) : item?.time,
                message: Array.isArray(item?.message) ? getRandom(item?.message) : item?.message,
            });
        }
    }

    return tempAutoSendData;
};

module.exports = createAutoSendData;
