const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Visits Collection
const FrequentedVisitsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required:true },
  place_id: { type: Schema.Types.ObjectId, ref: 'Place', required:true }, 
});

module.exports = mongoose.model('Frequented', FrequentedVisitsSchema);
