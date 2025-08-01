const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  location: { type: String, maxLength: 100 },
  joinedAt: { type: Date, default: Date.now },
  receiveEmailAlerts: { type: Boolean, default: true },
  receiveSmsAlerts: { type: Boolean, default: false }

});

module.exports = mongoose.model('Profile', ProfileSchema);
