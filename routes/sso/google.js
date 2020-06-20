// -- Third party imports -- //
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// -- Constants -- //
const JWT_SECRET = process.env.JWT_SECRET || 'i-like-writing-and-reading-books';
const URL = process.env.GOOGLE_AUTH_DOMAIN || 'http://localhost:3005';
const SUCCESS_REDIRECT_URL = process.env.SUCCESS_REDIRECT_URL || 'http://localhost:3000';

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${URL}/api/v1/sso/google/callback`,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    let email = null;

    for (let i = 0; i < profile.emails.length; i++) {
        if (profile.emails[i].verified) {
            email = profile.emails[i].value;
            break;
        }
    }

    // We know that there can only be one user with the email
    const [existingUser] = await req.db.models.user.findAll({
        where: {
            email,
        },
    });

    // Update existing users
    if (existingUser) {
        // Set some fields
        existingUser.profile_image = profile.photos[0].value;
        await existingUser.save();

        // Send back the info
        return done(null, {
            profile: profile,
            userId: existingUser.id,
            token: accessToken,
        });
    }

    // Must create a new user
    const newUser = await req.db.models.user.create({
        email,
        profile_image: profile.photos[0].value,
    });

    return done(null, {
        profile: profile,
        userId: newUser.id,
        token: accessToken,
    });
}));

const router = new express.Router();
router.use(passport.initialize());

/**
 * @api {get} /google Request Google Oath
 * @apiPrivate
 * @apiName GetGoogleOath
 * @apiGroup GoogleAuth
 */
router.get('/', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    prompt: 'select_account',
}));

/**
 * @api {get} /google/callback Google Oath Success Callback
 * @apiPrivate
 * @apiName LoginViaGoogleOath
 * @apiGroup GoogleAuth
 */
router.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
    if (!req.user.userId) {
        return;
    }

    const token = jwt.sign({ userId: req.user.userId }, JWT_SECRET, { expiresIn: '2 days' });
    res.cookie('jwt', token);
    res.redirect(SUCCESS_REDIRECT_URL);
});

module.exports = router;
