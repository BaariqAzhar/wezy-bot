const generateRandom = (min = 0, max = 10) => {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;

    return rand;
};

const parseTextTime = (value) => {
    if (value < 10) return `0${value}`;
    return value;
};

const parseHHmmToMinutes = (value) => {
    const timeSplit = value.split(':');
    const timeHour = Number(timeSplit[0]);
    const timeMinute = Number(timeSplit[1]);
    const minutes = timeHour * 60 + timeMinute;
    return minutes;
};

const parseMinutesToHHmm = (value) => {
    const hours = parseInt(value / 60);
    const minutes = value % 60;
    return `${parseTextTime(hours)}:${parseTextTime(minutes)}`;
};

const randomRangeTime = (rangeTime) => {
    const timeSplit = rangeTime.split('-');
    const timeStart = timeSplit[0];
    const timeEnd = timeSplit[1];

    const startMinutes = parseHHmmToMinutes(timeStart);
    const endMinutes = parseHHmmToMinutes(timeEnd);

    const randomMinutes = generateRandom(startMinutes, endMinutes);

    const randomHHmm = parseMinutesToHHmm(randomMinutes);

    return randomHHmm;
};

module.exports = randomRangeTime;
