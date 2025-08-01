const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, minLength: 2, maxLength: 50, required: true },
  lastName: { type: String, minLength: 2, maxLength: 50, required: true },
  username: { type: String, minLength: 2, maxLength: 50, required},
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, minLength: 6, required: true },
});

module.exports = mongoose.model('User', UserSchema);