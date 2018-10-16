const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const routes = require('./static/routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const init = async () => {
	await app.prepare()

	createServer((req, res) => {
		const parsedUrl = parse(req.url, true)
		const { pathname } = parsedUrl
		// Redirect to trailing slash version of the route
		if (routes[`${pathname}/`]) {
			res.writeHead(301, {
				Location : req.url.replace(pathname, `${pathname}/`)
			})
			res.end()
			return
		}
		if (routes[pathname]) {
			// render the known routes
			app.render(
				req,
				res,
				routes[pathname].page,
				routes[pathname].query
			)
		} else {
			handle(req, res, parsedUrl)
		}
	}).listen(3000, (err) => {
		if (err) throw err
		// eslint-disable-next-line no-console
		console.log('> Ready on http://localhost:3000')
	})
}
init()
