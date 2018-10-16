const rimraf = require('rimraf')

module.exports = async filename => new Promise((resolve, reject) => {
	rimraf(filename, err => {
		if (err) {
			reject(err)
			return
		}
		resolve()
	})
})
