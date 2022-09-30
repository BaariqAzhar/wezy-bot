const getRandom = require('./getRandom');
const getRandomRangeTime = require('./getRandomRangeTime');

const createAutoSendData = (data) => {
    const tempAutoSendData = data.map((item) => {
        return {
            ...item,
            time: item?.time.includes('-') ? getRandomRangeTime(item?.time) : item?.time,
            message: Array.isArray(item?.message) ? getRandom(item?.message) : item?.message,
        };
    });

    return tempAutoSendData;
};

module.exports = createAutoSendData;
