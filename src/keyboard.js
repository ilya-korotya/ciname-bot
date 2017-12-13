const kb = require('./keyboard-buttons.js');

module.exports = {
  home: [
      [kb.home.films, kb.home.cinemas],
      [kb.home.favorite],
  ],
  films: [
      [kb.films.all],
      [kb.films.cartoon, kb.films.drama],
      [kb.back],
  ]
};