// -- Third party imports -- //
const express = require('express');

// -- Local imports -- //
const { auth, params } = require('../middleware');

// -- Constants -- //
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @api {post} /api/v1/writing/ Create a new writing
 * @apiName CreateWriting
 * @apiGroup Writing
 *
 * @apiParam {String} text The text of the writing
 * @apiParam {String} title The title of the writing
 * @apiParam {Integer} BookId The book ID writing belongs to
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
router.post('/', auth(), params(['text', 'title', 'BookId']), async (req, res) => {
    const body = req.body;
});

module.exports = router;
