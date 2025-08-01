const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Badge Definitions Collection
const BadgesDefinitionSchema = new Schema({
  _id: ObjectId("..."),
  badge_type: "weather_warrior",
  name: "Weather Warrior",
  description: "Demonstrated exceptional weather awareness",
  levels: {
    bronze: {
      criteria: "Avoided 1 severe weather event",
      icon_url: "/badges/weather-warrior-bronze.png"
    },
    silver: {
      criteria: "Consistently rerouted around bad weather",
      icon_url: "/badges/weather-warrior-silver.png"
    },
    gold: {
      criteria: "Mastered advanced weather avoidance",
      icon_url: "/badges/weather-warrior-gold.png"
    }
  }
});

module.exports = mongoose.model('Badges', BadgesDefinitionSchema);

