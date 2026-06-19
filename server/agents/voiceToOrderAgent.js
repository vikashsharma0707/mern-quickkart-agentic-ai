const chat = require("./chatToOrderAgent");
exports.run = async (uid, msg) => ({ ...(await chat.run(uid, msg)), agent: "voice-to-order" });
