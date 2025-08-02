const User = require('../models/users');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const momentumDataPoint = require('../utils/momentumDataPoint');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { redirect } = require('react-router-dom');
const { password } = require('pg/lib/defaults');

exports.login = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', (err, user, info, status)=> {
        console.log(err);        console.log(user);        console.log(info);

        if(err) {return next(err)}
        if(!user) {
            return res.status(404).json({
                message: 'user or password incorrect'
            });
        }
        return res.status(200).json({
            message: 'logged in successfully'
        });
    })(req, res, next);
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
    const existingUser = await User.findOne({ id: userId });
    if (existingUser) {
        return res.status(409).json({message: 'user already exists'});
    }
    
    console.log('i get here')
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashPassword)
    
    const userData = await momentumDataPoint(userId);

    console.log(userData)

    try {
        await User.create(Object.assign({}, userData, { password: hashPassword, id: userId }));
    } catch (err) {
        console.log(err)
    }

    return res.status(200).json({message: 'registered'});
});