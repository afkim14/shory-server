// -- Third party imports -- //
const express = require('express');

// -- Local imports -- //
const { auth, params } = require('../middleware');

// -- Constants -- //
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @api {post} /api/v1/user/ Create a new User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} email The email of the user.
 *
 * @apiSuccess {String} response "success"
 * @apiSuccessExample Success (200):
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "success"
 *     }
 *
 * @apiError {String} response The reason for the error
 * @apiErrorExample Bad Request (400)
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "response": "Missing required params"
 *     }
 */
router.post('/', auth(), params(['email', 'profile_image']), async (req, res) => {
    const body = req.body;
});

module.exports = router;
