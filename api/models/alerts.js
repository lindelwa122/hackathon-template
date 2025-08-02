const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    title: { type: String, required: true, minLength:3, maxLength: 200 },
    message: { type: String, required: true, minLength: 10, maxLength: 200 },
    status: { type: String, enum:['unread', 'read'], default: 'unread' },
    timestamp: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required:true }
});

module.exports = mongoose.model('Alerts', AlertSchema);
