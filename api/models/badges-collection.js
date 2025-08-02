const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User Badges Collection
const BadgesCollectionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    badge_type: "weather_warrior",
    current_level: "silver", // bronze|silver|gold
    unlocked_at: ISODate("2024-05-20T10:00:00Z"),
    achievements: [
        {
            action: "avoided_hail_storm",
      route: "Home → Work",
      timestamp: ISODate("2024-05-15T08:30:00Z"),
    },
  ],
});

module.exports = mongoose.model("Badges", BadgesCollectionSchema);
