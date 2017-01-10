module.exports = () => async (ctx, next) => {
  if (ctx.request.method === 'GET') {
    if (/js|css|favicon|image/.test(ctx.path)) {
      ctx.cacheControl = {
        maxAge: 60 * 60 * 24 * 180,
      }
    }
  }
  await next()
}
