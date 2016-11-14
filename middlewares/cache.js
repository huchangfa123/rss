module.exports = function () {
    return async (ctx, next) => {
        await next()
        if (/favicon/.test(ctx.request.path)) {
            ctx.cacheControl = {
                maxAge: 60 * 60 * 24 * 30
            }
        }
    }
}
