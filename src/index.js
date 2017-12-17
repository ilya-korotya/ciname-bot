const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const utlits = require('./utlits.js');
const keyboard = require('./keyboard.js');
const kb = require('./keyboard-buttons.js');
// const database = require('../database.json');

utlits.logStart();

mongoose.connect(config.DB_URL, {
  useMongoClient: true,
})
    .then(data => console.log('db OK'))
    .catch(err => console.log('db ERROR'));


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
//      "link": "https://www.kinopoisk.ru/film/dostuchatsya-do-nebes-1997-32898",
//      "picture": "https://st.kp.yandex.net/images/film_iphone/iphone360_32898.jpg",
//      "cinemas": ["c456", "c123"]
//    }
//  ]
// const cinemas = [
//   {
//     "uuid": "c123",
//     "name": "World Cinema Plus",
//     "location": {
//       "latitude": 59.883744,
//       "longitude": 30.268672
//     },
//     "url": "http://world-cinema-plus.com",
//     "films": ["f890", "f678", "f567", "f123", "f234"]
//   },
//   {
//     "uuid": "c234",
//     "name": "The Greatest Cinema",
//     "location": {
//       "latitude": 59.843103,
//       "longitude": 30.305378
//     },
//     "url": "http://the-greatest-cinema.com",
//     "films": ["f345", "f678"]
//   },
//   {
//     "uuid": "c345",
//     "name": "Watch your eyes",
//     "location": {
//       "latitude": 60.024840,
//       "longitude": 30.390167
//     },
//     "url": "http://watch-your-eyes.com",
//     "films": ["f123", "f345", "f456", "f567", "f789"]
//   },
//   {
//     "uuid": "c456",
//     "name": "Happy hours",
//     "location": {
//       "latitude": 59.828174,
//       "longitude": 30.377967
//     },
//     "url": "http://happy-hours.com",
//     "films": ["f234", "f456", "f789", "f890"]
//   },
//   {
//     "uuid": "c567",
//     "name": "Family Cinema",
//     "location": {
//       "latitude": 60.000354,
//       "longitude": 30.194079
//     },
//     "url": "http://family-cinema.com",
//     "films": ["f567", "f789"]
//   }
// ];

require('./models/film.model.js');
require('./models/cinema.model.js');
require('./models/user.model.js');

const Film = mongoose.model('films');
const Cinema = mongoose.model('cinemas');
const User = mongoose.model('users');

// films.forEach(f => new Film(f).save().catch(err => console.log(err)));
// cinemas.forEach(c => new Cinema(c).save().catch(err => console.log(err)));


// =================================================

const bot = new TelegramBot(config.TOKEN, {
  polling: true,
});

bot.on('message', msg => {

  const userId = utlits.getUserInd(msg);

  if (msg.location) {
    getCinemaFromQuery(userId, {}, msg.location);
  } else if (msg.text === kb.dialogPosition.error) {
    getCinemaFromQuery(userId, {});
  }

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
      bot.sendMessage(userId, 'Ваше местоположение',
          {
            reply_markup: {keyboard: keyboard.positionDialog},
          });
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

  Promise.all([authOrRegUser(msg.from.id), Film.findOne({uuid: math})])
      .then((info) => {

        const currentUser = info[0];
        const currentFilm = info[1];

        let filmFav = false;


        if (currentUser.favoriteFilms.length !== 0) {
          filmFav = currentUser.favoriteFilms.find(f => {
            if (f === currentFilm.uuid) {
              return true;
            }
            return false;
          });
        }

        console.log(filmFav);

        const film = Film.findOne({uuid: math}).then(film => {

          const caption =
              `Название:  ${film.name}\nГод:  ${film.year}\nРейтинг:  ${film.rate}\nСтрана:  ${film.country}\nВремя:  ${film.length}`;

          const textFav = filmFav ? 'Удалить из избраного' : 'В избранное';

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
                    text: textFav,
                    callback_data: JSON.stringify({
                      uuid: film.uuid,
                      user: currentUser.id,
                      flag: filmFav,
                    }),
                  }
                ]
              ]
            }
          });

        });

      });
});

bot.onText(/\/c(.+)/, (msg, [source, math]) => {

  const chatID = utlits.getUserInd(msg);

  const cinema = Cinema.findOne({uuid: math})
      .then((cinema) => {

        bot.sendMessage(chatID, cinema.name);

        bot.sendLocation(chatID,
            cinema.location.latitude,
            cinema.location.longitude);

      });

});

bot.on('callback_query', function (query) {

  const data = JSON.parse(query.data);

  let userPromise;

  if (data.flag) {

    User.findOne({id: data.user}).then(user => {
      const clearFilm = user.favoriteFilms.filter(f => {

        if (f === data.uuid) {
          return false;
        }

        return true;

      });
      user.favoriteFilms = clearFilm;
      user.save();
    });

  } else {
    User.findOne({id: data.user})
        .then(user => {
              user.favoriteFilms = [...user.favoriteFilms, data.uuid];
              user.save();
            }
        );
  }


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

function getCinemaFromQuery(chatID, query, position = null) {
  Cinema.find(query)
      .then(cinemas => {

        const html = cinemas.map((cinema, index) => {

          let distance = 'Неизвестно';

          if (position) {

            distance = utlits.getDistanceToCinema(
                position.latitude,
                position.longitude,
                cinema.location.latitude,
                cinema.location.longitude);
          }

          return `${index + 1}. ${cinema.name} растояние: <b>${distance} км</b> - /c${
              cinema.uuid}`;
        }).join(`\n`);

        sendHTML(chatID, html);
      })
      .catch((err) => console.log(err));
}

function sendHTML(chatID, html, kbName = null) {

  const options = {
    parse_mode: 'HTML',
  };

  if (kbName) {
    options['reply_markup'] = {
      keyboard: keyboard[kbName],
    }
  }

  bot.sendMessage(chatID, html, options);
}

function authOrRegUser(userID) {

  return User.findOne({id: userID}).then(user => {

    if (user) {
      return user;
    } else {
      return User.create({id: userID}).save();
    }

  });

}