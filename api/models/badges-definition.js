const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Badge Definitions Collection
const BadgesDefinitionSchema = new Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    threshold: { type: Number, required: true },
});

module.exports = mongoose.model('Badges', BadgesDefinitionSchema);
