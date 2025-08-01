// User Badges Collection
{
  _id: ObjectId("..."),
  user_id: ObjectId("..."),
  badge_type: "weather_warrior",
  current_level: "silver", // bronze|silver|gold
  unlocked_at: ISODate("2024-05-20T10:00:00Z"),
  achievements: [
    {
      action: "avoided_hail_storm",
      route: "Home → Work",
      timestamp: ISODate("2024-05-15T08:30:00Z")
    }
  ]
}
