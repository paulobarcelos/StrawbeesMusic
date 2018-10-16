const mkdirp = require('mkdirp')

module.exports = async filename => new Promise((resolve, reject) => {
	mkdirp(filename, err => {
		if (err) {
			reject(err)
			return
		}
		resolve()
	})
})
