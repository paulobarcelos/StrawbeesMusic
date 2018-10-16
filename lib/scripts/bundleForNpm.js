const pkg = require('../../package.json')
const mkdir = require('../utils/mkdir')
const cpdir = require('../utils/cpdir')
const saveJson = require('../utils/saveJson')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// build
	await fork('lib/scripts/build.js')
	// make bundle dir
	await mkdir('npm-bundle')
	await cpdir('out', 'npm-bundle/out')
	// create the new package
	const newPkg = {}
	newPkg.name = `${pkg.name}-static-${process.env.CONFIG || 'dev'}`
	newPkg.author = pkg.author
	newPkg.version = pkg.version
	newPkg.main = 'out/index.html'
	saveJson('npm-bundle/package.json', newPkg)
})
