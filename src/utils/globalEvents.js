const LISTENERS = new Map()
export const addGlobalEventListener = (name, fn) => {
	let handle = LISTENERS.get(name)
	if (!handle) {
		const listeners = new Map()
		const process = e => listeners.forEach(listener => listener(e))
		handle = { listeners, process }
		LISTENERS.set(name, handle)
	}
	if (!handle.listeners.has(fn)) {
		handle.listeners.set(fn, fn)
	}
}
export const removeGlobalEventListener = (name, fn) => {
	const handle = LISTENERS.get(name)
	if (!handle) {
		return
	}
	if (handle.listeners.has(fn)) {
		handle.listeners.delete(fn)
	}
	if (!handle.listeners.size) {
		LISTENERS.delete(name)
	}
}
export const removeAllGlobalEventListeners = (name) => {
	const handle = LISTENERS.get(name)
	if (!handle) {
		return
	}
	LISTENERS.delete(name)
}
export const fireGlobalEvent = (name, e) => {
	const handle = LISTENERS.get(name)
	if (!handle) {
		return
	}
	handle.process(e)
}
