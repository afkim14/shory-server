// -- Third party imports -- //
const Sequelize = require('sequelize');
const { EventEmitter } = require('events');

// -- Local imports -- //
const author = require('../models/author');
const book = require('../models/book');
const bookfeedback = require('../models/bookfeedback');
const user = require('../models/user');
const writing = require('../models/writing');
const writingfeedback = require('../models/writingfeedback');

// -- Constants -- //
const DB_USERNAME = process.env.DB_USERNAME || 'shory';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_HOST = process.env.DB_HOST || '0.0.0.0';
const DB_NAME = process.env.DB_NAME || 'short-db';

const DB_URL = `postgres://${ DB_USERNAME }:${ DB_PASSWORD }@${ DB_HOST }:5432/${ DB_NAME}`;

module.exports = class Database extends EventEmitter {
    /**
     * Default constructor
     *
     */
    constructor () {
        super(); // For event emitter

        this.sequelize = new Sequelize(DB_URL);

        this.models = {};

        this.sequelize.authenticate()
            .then(async () => {
                console.log('Connected to the db!');

                // Set up the required models
                this.models.author = author(this.sequelize, Sequelize.DataTypes);
                this.models.book = book(this.sequelize, Sequelize.DataTypes);
                this.models.bookfeedback = bookfeedback(this.sequelize, Sequelize.DataTypes);
                this.models.user = user(this.sequelize, Sequelize.DataTypes);
                this.models.writing = writing(this.sequelize, Sequelize.DataTypes);
                this.models.writingfeedback = writingfeedback(this.sequelize, Sequelize.DataTypes);

                // Set up the associations
                this.models.author.associate({
                    Book: this.models.book,
                });

                this.models.book.associate({
                    Author: this.models.author,
                    Writing: this.models.writing,
                });

                this.models.bookfeedback.associate({
                    User: this.models.user,
                });

                this.models.user.associate({
                    BookFeedback: this.models.bookfeedback,
                    WritingFeedback: this.models.writingfeedback,
                });

                this.models.writing.associate({
                    Book: this.models.book,
                });

                this.models.writingfeedback.associate({
                    User: this.models.user,
                });

                this.sequelize.sync().then(async () => {
                    this.emit('ready'); // Let everything know we are good to go
                });
            }).catch((err) => {
                console.log('Error connecting to the db');
                console.log(err);
            });
    }
};
