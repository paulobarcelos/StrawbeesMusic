import abortableFetch from './abortableFetch'

export default (input, init = {}, timeout) => {
	if (!timeout) {
		return fetch(input, init)
	}
	setTimeout(() => init.controller.abort(), timeout)
	return abortableFetch(input, init)
}
