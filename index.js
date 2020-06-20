if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Third-party modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Our modules
const { httpLogger } = require('./middleware');
const Database = require('./database');
const Logger = require('./modules/logger');
const routes = require('./routes');

// -- Constants -- //
const PORT = process.env.PORT || 3005;
const logger = new Logger('main');
const db = new Database();
const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.use(httpLogger(logger));

app.use(bodyParser.json()); // Parse out our json
app.use(cookieParser()); // Parse out our cookies

app.use((req, res, next) => {
    req.db = db; // Attach our db to the request
    req.logger = logger; // Attach our logger to the request
    next(); // Pass on to the next middlware
});

app.use('/api/v1/', routes);
app.use('/api/v1/docs', express.static('./docs'));

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server up and running on http://0.0.0.0:${ PORT }`);
});
