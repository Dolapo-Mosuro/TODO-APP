const passport = require("passport");
const LocalStrategy = require("passport-local");
const userModel = require("../models/user"); // Adjust the path to your user model

// Configure Passport strategies
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

module.exports = passport;
