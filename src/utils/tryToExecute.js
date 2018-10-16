import delay from './delay'

export default async (generator, maxTries = 5, interval = 100) => {
	let success = false
	let tries = 0
	let error
	let result
	let earlyExit = false
	const doEarlyExit = () => earlyExit = true
	while (!success && tries < maxTries) {
		tries++
		try {
			result = await generator(doEarlyExit)
			success = true
			error = null
		} catch (e) {
			error = e
			if (earlyExit) {
				break
			}
			await delay(interval)
		}
	}
	if (!success) {
		throw error
	}
	return result
}
