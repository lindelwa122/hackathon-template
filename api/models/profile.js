const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  risk_score: { type: Number, required: true, min: 0 },
  badges: [{type: Schema.Types.ObjectId, ref: 'Badge'}],
  last_known_location: {
    address: { type: String, minLength: 5, required: true },
    timestamp: { type: Date, required: String },
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
