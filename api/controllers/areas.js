const Place = require('../models/place');
const PlaceSerializer = require('../serializers/place');
const asyncHandler = require('express-async-handler');

exports.getHome = asyncHandler(async (req, res, next) => {
    const place = await Place.findOne({ user_id: req.user._id, name: 'home' });
    const serializedData = new PlaceSerializer(place);
    return res.status(200).json({
        data: serializedData.getJSON()
    });
});

exports.getWork = asyncHandler(async (req, res, next) => {
    const place = await Place.findOne({ user_id: req.user._id, name: 'work' });
    const serializedData = new PlaceSerializer(place);
    return res.status(200).json({
        data: serializedData.getJSON()
    });
});

exports.getFrequentedPlace = asyncHandler(async (req, res, next) => {
    const place = await Place.find({ user_id: req.user._id })
        .sort({ timesVisited: 'desc' })
        .exec()[0];

    const serializedData = new PlaceSerializer(place);
    return res.status(200).json({
        data: serializedData.getJSON()
    });
});
