const getRandom = require('./getRandom');
const randomRangeTime = require('./randomRangeTime');

const createAutoSendData = (data) => {
    const tempAutoSendData = data.map((item) => {
        return {
            ...item,
            time: item?.time.includes('-') ? randomRangeTime(item?.time) : item?.time,
            message: Array.isArray(item?.message) ? getRandom(item?.message) : item?.message,
        };
    });

    return tempAutoSendData;
};

module.exports = createAutoSendData;
