const fs = require('fs')

module.exports = async filename => new Promise(resolve => {
	fs.access(filename, err => {
		if (err) {
			resolve(false)
			return
		}
		resolve(true)
	})
})
