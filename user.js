const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, minLength: 2, maxLength: 50, required: true },
  lastName: { type: String, minLength: 2, maxLength: 50, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, minLength: 6, required: true },
  id: { type: String, minLength: 13 , maxLength:13, required: true}
  
});

// password hash
UserSchema.pre('save', async function(next) {

  if (!this.isModified('password')) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
