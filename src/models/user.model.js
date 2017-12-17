const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new  Schema({
  id: {
    type: Number,
    required: true
  },
  favoriteFilms: {
    type: [String],
    default: [],
  }
});

mongoose.model('users', UserSchema);