// -- Third party imports -- //
const jwt = require('jsonwebtoken');

// -- Constants -- //
const JWT_SECRET = process.env.JWT_SECRET || 'i-like-writing-and-reading-books';

const params = (requiredParams = []) => {
    return async (req, res, next) => {
        const body = req.body;
        console.log(req.body);

        for (let i = 0; i < requiredParams.length; i++) {
            if (body[requiredParams[i]] === undefined) {
                res.status(400).json({
                    response: `Missing required param: ${requiredParams[i]}`,
                });
                return;
            }
        }

        await next();
    };
};

const httpLogger = (logger) => {
    return (req, res, next) => {
        const ts = Date.now();
        logger.info(`--> ${req.method} ${ req.url }`);
        next();
        res.on('finish', () => {
            logger.info(`<-- ${ res.statusCode } ${Date.now() - ts}ms`);
        });
    };
};

const auth = () => {
    return async (req, res, next) => {
        if (req.cookies === undefined) {
            res.status(403).json({
                response: 'unauthorized',
            });
            return;
        }

        req.auth = {}; // Object to be passed around

        if (req.cookies.jwt !== undefined) {
            const decodedToken = jwt.verify(req.cookies.jwt, JWT_SECRET);
            req.auth.user = { userId: decodedToken.userId };
        } else {
            res.status(403).json({
                response: 'unauthorized',
            });
            return;
        }

        next();
    };
};


module.exports = { params, auth, httpLogger };
