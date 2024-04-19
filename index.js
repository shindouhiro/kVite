const koa = require('koa')
const fs = require("node:fs")
const { resolve } = require("node:path")
const app = new koa()

app.use(ctx => {
  console.log(ctx, 'ctx')
  const url = ctx.url
  if (url === '/') {
    const html = fs.readFileSync("./index.html", "utf8")
    ctx.type = 'html'
    ctx.body = html
  } else if (url.endsWith('.js')) {
    console.log(url, 'url')
    console.log(__dirname, 'dirname')
    const jsUrl = resolve(__dirname, url.slice(1))
    ctx.type = "application/javascript"
    ctx.body = fs.readFileSync(jsUrl, "utf8")
  }
})

app.listen(3000, () => {
  console.log('Sever is running')
})
