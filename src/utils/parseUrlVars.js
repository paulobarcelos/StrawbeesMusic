export default (url) => {
	const vars = {}
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
		vars[key] = value
	})
	url.replace(/[?&]+([^=&]+)/gi, (m, key) => {
		if (!vars[key]) {
			vars[key] = '1'
		}
	})
	return vars
}
