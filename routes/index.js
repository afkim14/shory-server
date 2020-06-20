// -- Third party imports -- //
const express = require('express');

// -- Local imports -- //
const author = require('./author');
const user = require('./user');
const book = require('./book');
const writing = require('./writing');
const google = require('./sso/google');

// -- Constants -- //
// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/author', author);
router.use('/user', user);
router.use('/book', book);
router.use('/writing', writing);
router.use('/sso/google', google);

module.exports = router;
