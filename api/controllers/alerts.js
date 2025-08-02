const Alerts = require('./models/alerts');
const AlertsSerializer = require('../serializers/alerts');
const asyncHandler = require('express-async-handler');

exports.get = asyncHandler(async(req, res, next)=>{
    const alerts = await Alerts.find({ user_id: req.user._id });
    const serializedAlerts = new AlertsSerializer(alerts);
    res.status(200).json({
        alerts: serializedAlerts.getJSON()
    });
});