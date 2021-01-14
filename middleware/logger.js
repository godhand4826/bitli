const config = require('../config')
const koaPino = require('koa-pino-logger')
const pino = require('pino')

const options = {
    prettyPrint: config.DEBUG ? true : false,
    level: config.DEBUG ? 'debug' : 'info'
}

const logger = koaPino(options)
const log = pino(options)

module.exports = {
    log,
    logger
}
