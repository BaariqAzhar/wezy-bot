const getRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)];
};

module.exports = getRandom;
