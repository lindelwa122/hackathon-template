const mongoose = require("mongoose");
const { options } = require("../routes/authentication");

const Schema = mongoose.Schema;

// Places Collection
const FrequentedPlacesSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, minLength: 3, maxLength: 30, options: ['home', 'work', 'other'] },
    location: { type: String, required: true, minLength: 3 },
    arrival: { type: Date, required: true },
    departure: { type: Date, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
});

module.exports = mongoose.model("Place", FrequentedPlacesSchema);
