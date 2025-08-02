const Badges = require('../models/badge');
const BadgesSerializer = require('../serializers/badge');
const profileSerializer = require('../serializers/profile');
const asyncHandler = require('express-async-handler');
const Profile = require('../models/profile');

exports.all = asyncHandler(async (req, res, next) => {
    const badges = await Badges.find({});
    const serializedData = new BadgesSerializer(badges);
    return res.status(200).json({
        data: serializedData
    });
});

exports.acquired = asyncHandler(async (req, res, next) => {
    const profile = await Profile.find({ user_id: req.user._id });
    const serializedData = new profileSerializer(profile);
    serializedData.include('badges');
    return res.status(200).json({
        data: serializedData
    });
});

exports.current = asyncHandler(async (req, res, next) => {
    const profile = await Profile.find({ user_id: req.user._id })[0];
    const riskyScore = profile.risky_score;
    const badges = profile.badges;

    const acquiredBadges = [];
    for (const badge of badges) {
        if (badge.threshold >= riskyScore) {
            acquiredBadges.push(badge);
        }
    }

    const currentBadge = acquiredBadges.sort((a, b) => a.threshold - b.threshold);
    
    return res.status(200).json({
        data: currentBadge
    });
});