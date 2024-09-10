
const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// done(error, data, message/info)
passport.use(new LocalStrategy( async (EMAIL, PASSWORD, done) => {

    try {

        if(!(EMAIL && PASSWORD)) {
            return done(null, false, { message: 'Please enter both email and password' });
        }

        const user = await User.findOne({email : EMAIL });

        if(!user) {
            done(null, false, { message: 'Invalid email' });
        } 

        // comparing password using bcrypt
        const isMatch = await bcrypt.compare(PASSWORD, user.password);
        if(isMatch) {
            done(null, user);
        } else {
            done(null, false, { message: 'Invalid password' });
        }

    } catch(err) {
        done(err);
    }
}))

module.exports = passport;

