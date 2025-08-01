const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Visits Collection
const FrequentedVisitsSchema = new Schema({
  _id: ObjectId("..."),
  place_id: ObjectId("..."), 
  user_id: ObjectId("..."), 
  arrival_time: ISODate("2024-05-20T08:00:00Z"),
  departure_time: ISODate("2024-05-20T17:30:00Z"),
  duration_minutes: 570, // Auto-calculated
  weather_risk: "heavy_rain",
  notes: "Traffic was bad due to weather"
});

module.exports = mongoose.model('Frequented', FrequentedVisitsSchema);
