const kb = require('./keyboard-buttons.js');

module.exports = {
  home: [
    [kb.home.films, kb.home.cinemas],
    [kb.home.favorite],
  ],
  films: [
    [kb.films.all],
    [kb.films.action, kb.films.comedy],
    [kb.back],
  ],
  positionDialog: [
    [
      {
        text: kb.dialogPosition.success,
        request_location: true,
      },
      {
        text: kb.dialogPosition.error,
      }
    ], [
      kb.back,
    ]
  ]
};