const winston = require('winston');
const path = require('path');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};


module.exports = winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.colorize(),
        winston.format.printf(
            log => {
                // nếu log là error hiển thị stack trace còn không hiển thị message của log
                if(log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
                return  `[${log.timestamp}] [${log.level}] ${log.message}`;
            },
        ),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'error',
            filename: path.join(__dirname, 'errors.log')
        })
    ],
})
