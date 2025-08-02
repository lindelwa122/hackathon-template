const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, minLength: 2, maxLength: 50, required: true },
  lastName: { type: String, minLength: 2, maxLength: 50, required: true },
  username: { type: String, minLength: 2, maxLength: 50, required: true},
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, minLength: 6, required: true },
  id: { type: String, minLength: 13, maxLength: 13, required: true },
  car: {
    model: { type: String, minLenght: 3, required: true },
    numberPlate: { type: String, minLength: 10, maxLength: 20, required: true },
    releaseDate: { type: Date, required: true },
  }
});

module.exports = mongoose.model('User', UserSchema);