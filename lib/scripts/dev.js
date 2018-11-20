const handler = require('serve-handler')
const http = require('http')
const clean = require('./clean')
const copyResources = require('./copyResources')
const manageLocales = require('./manageLocales')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// clean
	await clean()
	// copy static resources
	await copyResources()
	// manage the locale files
	await manageLocales()
	// start static server
	const staticServer = http.createServer((request, response) =>
		handler(request, response, { public : 'static' })
	)
	staticServer.listen(1338)
	// start next
	await fork('next.server.js')
})
