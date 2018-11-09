const path = require('path')
const handler = require('serve-handler')
const http = require('http')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// build
	await fork(path.join('lib', 'scripts', 'build.js'))
	// server
	const staticServer = http.createServer((request, response) =>
		handler(request, response, { public : 'out' })
	)
	staticServer.listen(3000)
})
