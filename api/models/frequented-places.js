const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Places Collection
const FrequentedPlacesSchema = new Schema({
  _id: ObjectId("..."),
  user_id: ObjectId("..."), 
  category: "home",
  name: "My Home",
  location: {
    type: "Point",
    coordinates: [18.4241, -33.9249] 
  },
  radius_meters: 100, 
  is_favorite: true,
  created_at: ISODate("2024-05-20T10:00:00Z"),
  updated_at: ISODate("2024-05-20T10:00:00Z")
});

module.exports = mongoose.model('Frequented', FrequentedPlacesSchema);
