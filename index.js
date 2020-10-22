const path = require('path')
const Koa = require('koa')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser')
const responseTime = require('koa-response-time')
const static = require('koa-static')
const config = require('./config')
const { log, logger } = require('./middleware/logger')
const catchAll = require('./middleware/catchAll')
const api = require('./routes/api')
const db = require('./db')

const app = new Koa()
app.keys = config.KEYS
app.use(catchAll)
app.use(conditional())
app.use(etag())
app.use(helmet())
app.use(responseTime())
app.use(bodyParser())
app.use(logger)

app.use(static(path.join(__dirname, 'static'), { maxage: 0/*24 * 60 * 60 * 1000*/ }))
app.use(api.routes())

const server = app.listen(config.PORT, '0.0.0.0', () => {
    log.info(`listening ${config.PORT}`)

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
    process.on('uncaughtException', shutdown)

    async function shutdown(){
        console.log('shutting down...')
        await db.destroy()
        server.close(() => console.log('done'))
    }
})
