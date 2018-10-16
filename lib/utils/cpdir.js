const ncp = require('ncp')

module.exports = async (src, dst) => new Promise(resolve => {
	ncp(src, dst, err => {
		if (err) {
			resolve(false)
			return
		}
		resolve(true)
	})
})
