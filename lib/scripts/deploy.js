const path = require('path')
const upload = require('./upload')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// build
	await fork(path.join('lib', 'scripts', 'build.js'))
	// upload
	await upload()
})
