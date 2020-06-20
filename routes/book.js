// -- Third party imports -- //
const express = require('express');

// -- Local imports -- //
const { auth, params } = require('../middleware');

// -- Constants -- //
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @api {post} /api/v1/book/ Create a new book
 * @apiName CreateBook
 * @apiGroup Book
 *
 * @apiParam {String} title The title of the book
 * @apiParam {String} category Category of the book
 * @apiParam {Integer} AuthorId The author ID book belongs to
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
router.post('/', auth(), params(['title', 'category', 'AuthorId']), async (req, res) => {
    const body = req.body;
});

module.exports = router;
