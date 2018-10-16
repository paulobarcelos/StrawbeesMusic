const fs = require('fs')
const path = require('path')
const mkdir = require('./mkdir')

module.exports = async (filename, contents) => {
	await mkdir(path.dirname(filename))
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, contents, err => {
			if (err) {
				reject(err)
				return
			}
			resolve()
		})
	})
}
