// -- Third party imports -- //
const express = require('express');

// -- Local imports -- //
const { auth, params } = require('../middleware');

// -- Constants -- //
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @api {post} /api/v1/author/ Create a new Author
 * @apiName CreateAuthor
 * @apiGroup Author
 *
 * @apiParam {String} name The name of the Author.
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
router.post('/', auth(), params(['name']), async (req, res) => {
    const body = req.body;
});

module.exports = router;
