const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    title:{ type: String, required: true, minLenght:3, maxLenght: 200 },
    status: { type: String, enum:['unread', 'read'], default: 'unread' },
    timestamp: { type: Date, default: Date.now },
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required:true}
});

module.exports = mongoose.model('Alerts', AlertSchema);
