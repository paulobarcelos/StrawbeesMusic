const saveFile = require('./saveFile')

module.exports = async (filename, contents) =>
	saveFile(filename, JSON.stringify(contents, null, '\t'))
