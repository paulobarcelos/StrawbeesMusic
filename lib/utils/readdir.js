const fs = require('fs')

module.exports = async filename => new Promise((resolve, reject) => {
	fs.readdir(filename, (err, items) => {
		if (err) {
			reject(err)
			return
		}
		resolve(items)
	})
})
