const Frequented = require('./models/frequented_visits');
const asyncHandler = require('express-async-handler');

exports.getHome = asyncHandler(async (req, res, next) => {
    const frequented = await Frequented.find({ user_id: req.user._id });
    
});
