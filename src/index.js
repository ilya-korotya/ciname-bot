const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js');
const utlits = require('./utlits.js');
const keyboard = require('./keyboard.js');
const kb = require('./keyboard-buttons.js');


utlits.logStart();

const bot = new TelegramBot(config.TOKEN, {
  polling: true,
});

bot.on('message', msg => {

  const userId = utlits.getUserInd(msg);

  switch (msg.text) {
    case kb.home.films:

      bot.sendMessage(userId, 'Что смотрим?', {
        reply_markup: {keyboard: keyboard.films},
      });

      break;
    case kb.home.cinemas:

      break;
    case kb.home.favorite:

      break;
    case kb.back:

      bot.sendMessage(userId, 'Что делаем?', {
        reply_markup: {keyboard: keyboard.home},
      });

      break;

  }

});

bot.onText(/\/start/, msg => {

  const text = `Привет, ${msg.from.first_name} ${msg.from.last_name}. Выбери команду: `;

  bot.sendMessage(utlits.getUserInd(msg), text, {
    reply_markup: {
      keyboard: keyboard.home,
    }
  });

});