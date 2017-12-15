const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
  },
  url: {
    type: String,
  },
  films: {
    type: [String],
    default: [],
  }
});

mongoose.model('cinemas', CinemaSchema);