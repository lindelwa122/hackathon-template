const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MonitoredDestinationSchema = new Schema({
  location: { type: String, required: true, minLength: 2, maxLength: 100 },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  lastChecked: { type: Date, default: Date.now },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MonitoredDestination', MonitoredDestinationSchema);
