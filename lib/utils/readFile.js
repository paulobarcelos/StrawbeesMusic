const fs = require('fs')


module.exports = async (filename, encoding = 'utf8') =>
	new Promise((resolve, reject) => {
		fs.readFile(filename, encoding, (err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(data)
		})
	})
