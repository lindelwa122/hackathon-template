const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Visits Collection
const FrequentedVisitsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required:true },
  place_id: { type: Schema.Types.ObjectId, ref: 'Place', required:true },
  times_visited: { type: Number, required: true, defualt: 1, min: 0}
});

module.exports = mongoose.model('Frequented', FrequentedVisitsSchema);
