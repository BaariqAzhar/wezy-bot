const waConfig = require('../../wa.config.json');

const messageController = async (client, message) => {
    const mentions = await message.getMentions();
    for (let contact of mentions) {
        if (contact.number === waConfig?.configuration?.botNumber) {
            if (Array.isArray(waConfig?.mention?.reply)) {
                const replyLength = waConfig?.mention?.reply.length;
                const randomIndex = Math.floor(Math.random() * replyLength);
                const replyText = waConfig?.mention?.reply?.[randomIndex];
                console.log('reply : ', replyText);
                message.reply(replyText);
            }
        }
    }

    const messageBody = message.body;
    const lowerCaseMessage = messageBody.toLowerCase();

    const replyData = waConfig?.reply;
    if (replyData) {
        for (const i in replyData) {
            if (replyData?.[i]?.message && replyData?.[i]?.reply && replyData?.[i]?.no) {
                let firstCodition = false;
                let secondCondition = false;
                if (Array.isArray(replyData?.[i]?.message)) {
                    const lowerCaseMessageData = replyData?.[i]?.message?.map((item) => item?.toLowerCase());
                    secondCondition = lowerCaseMessageData.includes(lowerCaseMessage);
                } else {
                    firstCodition = lowerCaseMessage === replyData?.[i]?.message?.toLowerCase();
                }

                if (firstCodition || secondCondition) {
                    if (Array.isArray(replyData?.[i]?.reply)) {
                        const replyLength = replyData?.[i]?.reply?.length;
                        const randomIndex = Math.floor(Math.random() * replyLength);
                        const replyText = replyData?.[i]?.reply?.[randomIndex];
                        console.log('reply : ', replyText);
                        message.reply(replyText);
                    } else {
                        const replyText = replyData?.[i]?.reply;
                        console.log('reply : ', replyText);
                        message.reply(replyText);
                    }
                }
            }
        }
    }

    // //   * Hi
    // if (lowerCaseMessage === 'hello' || lowerCaseMessage === 'hi' || lowerCaseMessage === 'halo') {
    //     console.log('send message', lowerCaseMessage);
    //     message.reply(`Hiiiii`);
    // }

    // //  * Good Morning
    // if (
    //     (lowerCaseMessage.includes('selamat') && lowerCaseMessage.includes('pagi')) ||
    //     (lowerCaseMessage.includes('good') && lowerCaseMessage.includes('morning'))
    // ) {
    //     let randomNum = 0;

    //     const num = Math.random();
    //     if (num < 0.3) {
    //         randomNum = 0;
    //     } else if (num < 0.6) {
    //         randomNum = 1;
    //     } else {
    //         randomNum = Math.floor(Math.random() * 11);
    //     }

    //     console.log('send message ', greetings[randomNum]);
    //     message.reply(greetings[randomNum]);
    // }

    // // * List Birthday
    // if (
    //     lowerCaseMessage.includes('minta') &&
    //     lowerCaseMessage.includes('list') &&
    //     lowerCaseMessage.includes('ulang') &&
    //     lowerCaseMessage.includes('tahun')
    // ) {
    //     console.log('send message list birthday');
    //     message.reply(mbhBirthdayList);
    // }
};

module.exports = messageController;
