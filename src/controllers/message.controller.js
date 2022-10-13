const waConfig = require('../../wa.config.json');

const messageController = async (client, message) => {
    // console.log('messageController');
    const mentions = await message.getMentions();
    if (waConfig?.configuration && waConfig?.configuration?.botNumber && waConfig?.configuration?.masterNumber) {
        for (let contact of mentions) {
            if (contact.number === waConfig?.configuration?.botNumber) {
                if (Array.isArray(waConfig?.mention?.reply)) {
                    const replyLength = waConfig?.mention?.reply.length;
                    const randomIndex = Math.floor(Math.random() * replyLength);
                    const replyText = waConfig?.mention?.reply?.[randomIndex];
                    console.log('reply : ', replyText);
                    message.reply(replyText);
                } else {
                    const replyText = waConfig?.mention?.reply;
                    console.log('reply : ', replyText);
                    message.reply(replyText);
                }
            }
        }
    }

    const messageBody = message.body;
    const lowerCaseMessage = messageBody.toLowerCase();
    // console.log('lowerCaseMessage : ', lowerCaseMessage);

    const replyData = waConfig?.reply;
    if (replyData) {
        // console.log('replyData : ', replyData);
        for (const i in replyData) {
            if (replyData?.[i]?.message && replyData?.[i]?.reply) {
                // console.log('replyData[i] : ', replyData[i]);
                let firstCodition = false;
                let secondCondition = false;
                if (Array.isArray(replyData?.[i]?.message)) {
                    const lowerCaseMessageData = replyData?.[i]?.message?.map((item) => item?.toLowerCase());
                    for (const item of lowerCaseMessageData) {
                        if (lowerCaseMessage.includes(item)) {
                            secondCondition = true;
                            break;
                        }
                    }
                } else {
                    firstCodition = lowerCaseMessage.includes(replyData?.[i]?.message?.toLowerCase());
                }

                // console.log('firstCodition : ', firstCodition);
                // console.log('secondCondition : ', secondCondition);
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
};

module.exports = messageController;
