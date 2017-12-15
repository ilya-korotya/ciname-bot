const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const utlits = require('./utlits.js');
const keyboard = require('./keyboard.js');
const kb = require('./keyboard-buttons.js');
//const database = require('../database.json');

utlits.logStart();

mongoose.connect(config.DB_URL, {
  useMongoClient: true,
})
    .then(data => console.log('db OK'))
    .catch(err => console.log('db ERROR'));

console.log(123321);


// const films = [
//   {
//     "uuid": "f123", //
//     "name": "Начало", //
//     "type": "action", //
//     "year": "2010",
//     "rate": 8.665,
//     "length": "2:28",
//     "country": "США",
//     "link": "https://www.kinopoisk.ru/film/nachalo-2010-447301",
//     "picture": "https://www.kinopoisk.ru/images/film_big/447301.jpg",
//     "cinemas": ["c123", "c345"]
//   },
//   {
//     "uuid": "f234",
//     "name": "Гладиатор",
//     "type": "action",
//     "year": "2000",
//     "rate": 8.592,
//     "length": "2:35",
//     "country": "США",
//     "link": "https://www.kinopoisk.ru/film/gladiator-2000-474",
//     "picture": "https://www.kinopoisk.ru/images/film_big/474.jpg",
//     "cinemas": ["c123", "c456"]
//   },
//   {
//     "uuid": "f345",
//     "name": "Матрица",
//     "type": "action",
//     "year": "1999",
//     "rate": 8.491,
//     "length": "2:16",
//     "country": "США",
//     "link": "https://www.kinopoisk.ru/film/matrica-1999-301",
//     "picture": "https://st.kp.yandex.net/images/film_iphone/iphone360_301.jpg",
//     "cinemas": ["c345", "c234"]
//   },
//   {
//     "uuid": "f456",
//     "name": "Брат",
//     "type": "action",
//     "year": "1997",
//     "rate": 8.491,
//     "length": "1:40",
//     "country": "Россия",
//     "link": "https://www.kinopoisk.ru/film/brat-1997-41519",
//     "picture": "https://www.kinopoisk.ru/images/film_big/41519.jpg",
//     "cinemas": ["c345", "c456"]
//   },
//   {
//     "uuid": "f567",
//     "name": "Карты, деньги, два ствола",
//     "type": "comedy",
//     "year": "1998",
//     "rate": 8.543,
//     "length": "1:47",
//     "country": "Великобритания",
//     "link": "https://www.kinopoisk.ru/film/karty-dengi-dva-stvola-1998-522",
//     "picture": "https://st.kp.yandex.net/images/film_iphone/iphone360_522.jpg",
//     "cinemas": ["c345", "c567", "c123"]
//   },
//   {
//     "uuid": "f678",
//     "name": "Форрест Гамп",
//     "type": "comedy",
//     "year": "1994",
//     "rate": 8.922,
//     "length": "2:22",
//     "country": "США",
//     "link": "https://www.kinopoisk.ru/film/forrest-gamp-1994-448",
//     "picture": "https://st.kp.yandex.net/images/film_iphone/iphone360_448.jpg",
//     "cinemas": ["c234", "c123"]
//   },
//   {
//     "uuid": "f789",
//     "name": "1+1",
//     "type": "comedy",
//     "year": "2011",
//     "rate": 8.812,
//     "length": "1:52",
//     "country": "Франция",
//     "link": "https://www.kinopoisk.ru/film/11-2011-535341",
//     "picture": "https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg",
//     "cinemas": ["c567", "c345", "c456"]
//   },
//   {
//     "uuid": "f890",
//     "name": "Достучаться до небес",
//     "type": "comedy",
//     "year": "1997",
//     "rate": 8.634,
//     "length": "1:27",
//     "country": "Германия",
//     "link": "https://www.kinopoisk.ru/film/dostuchatsya-do-nebes-1997-32898",
//     "picture": "https://st.kp.yandex.net/images/film_iphone/iphone360_32898.jpg",
//     "cinemas": ["c456", "c123"]
//   }
// ]

require('./models/film.model.js');

const Film = mongoose.model('films');
//films.forEach(f => new Film(f).save().catch(err => console.log(err)));


// =================================================

const bot = new TelegramBot(config.TOKEN, {
  polling: true,
});

bot.on('message', msg => {

  const userId = utlits.getUserInd(msg);

  switch (msg.text) {
    case kb.films.all:
      getFilmFromQuery(userId, {});
      break;
    case kb.films.action:
      getFilmFromQuery(userId, {type: 'action'});
      break;
    case kb.films.comedy:
      getFilmFromQuery(userId, {type: 'comedy'});
      break;
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

bot.onText(/\/f(.+)/, (msg, [source, math]) => {

  const chatID = utlits.getUserInd(msg);

  const film = Film.findOne({uuid: math}).then(film => {

    const caption =
        `Название:  ${film.name}\nГод:  ${film.year}\nРейтинг:  ${film.rate}\nСтрана:  ${film.country}\nВремя:  ${film.length}`;

    bot.sendPhoto(chatID, film.picture, {
      caption: caption,
      reply_markup: {
        inline_keyboard: [
            [
              {
                text: 'Кинопоиск',
                url: film.link,
              }
            ],
            [
              {
                text: 'В избранное',
                callback_data: film.uuid,
              }
            ]
        ]
      }
    });

  });


});


//====================================

function getFilmFromQuery(chatID, query) {
  Film.find(query)
      .then(films => {

        const html = films.map((f, i) => {
          return `${i + 1} <b>${f.name}</b> - /f${f.uuid}`;
        }).join('\n');

        sendHTML(chatID, html, 'films');

      })
      .catch(err => console.log(`Ошибка запроса ${err}`))
}

function sendHTML(chatID, html, kbName = null) {

  const options = {
    parse_mode: 'HTML',
  };

  if(kbName) {
    options['reply_markup'] = {
      keyboard: keyboard[kbName],
    }
  }

  bot.sendMessage(chatID, html, options);
}