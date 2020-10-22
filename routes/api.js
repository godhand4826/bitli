const Router = require('koa-router')
const { Link } = require('../models')

const router = Router({ prefix: '/api' })
router.get('/:shorten', async ctx => {
    const link = await Link.query().select('origin').where('shorten', ctx.params.shorten).first()
    if (link) {
        ctx.redirect(link.origin)
    } else {
        ctx.status = 410
    }
})

router.post('/', async ctx => {
    const origin = ctx.request.body.origin
    const shorten = random()
    if (!origin) {
        ctx.status = 403
        return
    }
    await Link.query().insert({
        origin,
        shorten
    }).then(() => {
        ctx.cookies.set('origin', origin, { httpOnly: false })
        ctx.cookies.set('shorten', shorten, { httpOnly: false })
        ctx.body = shorten
    }).catch(() => {
        ctx.status = 403
    })
})

function random() {
    const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return Array(6).fill(null).map(() => base62[Math.floor(Math.random() * 62)]).join('')
}

module.exports = router
