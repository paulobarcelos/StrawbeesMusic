const path = require('path')
const fs = require('fs').promises
const pkg = require('../../package.json')
const nwjsPkg = require('../../nwjs-src/package.json')
const cpdir = require('../utils/cpdir')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// force the 'desktop' config
	process.env.CONFIG = 'desktop'
	// build
	await fork(path.join('lib', 'scripts', 'build.js'))
	// copy the nwjs src files
	await cpdir('nwjs-src', 'out')
	// add missing information to package
	nwjsPkg.author = pkg.author
	nwjsPkg.version = pkg.version
	await fs.writeFile(path.join('out', 'package.json'), JSON.stringify(nwjsPkg, null, '\t'))
})
