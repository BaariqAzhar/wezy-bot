const chatIdOf = (numString) => {
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = numString.substring(1) + '@c.us';

    return chatId;
};

module.exports = chatIdOf;
