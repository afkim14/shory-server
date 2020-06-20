/**
 * Logger module
 */
class Logger {
    /**
     * Default constructor
     *
     * @param {string} prefix - log prefix
     */
    constructor (prefix) {
        this.prefix = prefix;
    }

    /**
     * Logs message with non-error coloring. Also includes timestamp.
     *
     * \x1b[33m%s\x1b[0m => formats standard log output with yellow coloring.
     *
     * @param {string} info - message to log
     */
    info (info) {
        console.log('\x1b[33m%s\x1b[0m', `[${new Date().toLocaleString()}] - ${this.prefix}: ${info}`);
    }

    /**
     * Logs message with error coloring. Also includes timestamp.
     *
     * \x1b[31m%s\x1b[0m => formats standard log output with red coloring.
     *
     * @param {string} error - error to log
     */
    error (error) {
        console.log('\x1b[31m%s\x1b[0m', `[${new Date().toLocaleString()}] - ${this.prefix}: ${error}`);
    }
}

module.exports = Logger;
