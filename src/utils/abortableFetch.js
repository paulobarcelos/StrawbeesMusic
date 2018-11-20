export default (input, init = {}) => {
	const controller = new AbortController()
	init.controller = controller
	init.signal = controller.signal
	return fetch(input, init)
}
