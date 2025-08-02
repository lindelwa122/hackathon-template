const User = require('../models/users');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const momentumDataPoint = require('../utils/ai_database');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { redirect } = require('react-router-dom');

exports.login = passport.authenticate('local', (err, user, info, status)=> {
    if(err) {return next(err)}
    if(!user) {
        return res.status(404).json({
            message: 'user or password incorrect'
        });
    }
    return res.status(200).json({
        message: 'logged in successfully'
    });
});

exports.logout = asyncHandler(async(req, res, next)=>{
    req.logout(err=>{
        if(err) return next(err);
        res.status(200).json({
            message: "logout successful"
        });
    });
});

exports.register = asyncHandler(async(req, res, next)=>{
    const userId = req.body.userId;
    const existingUser = awaits = User.findOne({firstName,lastName});
    if (existingUser) {
        return res.status(409).json({message: 'user already exists'});
    }

    const hashPassword = await bcrypt.hash(Password, 10);
    const userData = momentumDataPoint(userId);
    User.create(Object.assign({}, userData, { password: hashPassword }));

    return redirect('/auth/login');
});