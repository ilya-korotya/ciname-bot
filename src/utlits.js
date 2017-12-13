module.exports = {

  logStart() {
    console.log('Bot - started!');
  },

  getUserInd(msg) {
    return msg.chat.id;
  }

};
