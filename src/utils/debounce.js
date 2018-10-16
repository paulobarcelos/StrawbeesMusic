const hash = {}

export default (id, fn, timeout = 0) => {
	clearTimeout(hash[id])
	hash[id] = setTimeout(() => {
		delete hash[id]
		fn()
	}, timeout)
	return () => {
		clearTimeout(hash[id])
		delete hash[id]
	}
}
