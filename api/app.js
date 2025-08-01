const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const session = require('express-session');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');

mongoose.set('strictQuery', false);
const mongoDB = process.env.mongoDB;
const main = async () => {
  console.log('Connection initiated!');
  await mongoose.connect(mongoDB);
  console.log('Connection established!');
}
main().catch(err => console.error(err));

const pool = new Pool({

});

const app = express();

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            
            if (user == null || user.password != password) {
                return done(null, false, "Incorrect username/password");
            }

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
});

const alertsRoutes = require('./routes/alerts');
const areasRoutes = require('./routes/areas');
const authenticationRoutes = require('./routes/authentication');
const badgesRoutes = require('./routes/badges');
const dashboardRoutes = require('./routes/dashboard');
const travelEngineRoutes = require('./routes/travelEngine');

app.use('/alerts', alertsRoutes);
app.use('/areas', areasRoutes);
app.use('/auth', authenticationRoutes);
app.use('/badges', badgesRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/engine/travel', travelEngineRoutes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: ADD ROUTES

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;