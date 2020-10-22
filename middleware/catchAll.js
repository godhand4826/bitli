module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err){
        ctx.status = err.status || 500
    }
}
