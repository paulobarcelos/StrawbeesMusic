export default (objA, objB, interestKeys) => {
	if (objA === objB) {
		return true
	}

	if (!objA || !objB) {
		return false
	}

	let aKeys = Object.keys(objA)
	let bKeys = Object.keys(objB)
	if (interestKeys && interestKeys.length) {
		aKeys = aKeys.filter(key => interestKeys.indexOf(key) !== -1)
		bKeys = bKeys.filter(key => interestKeys.indexOf(key) !== -1)
	}
	const len = aKeys.length

	if (bKeys.length !== len) {
		return false
	}

	for (let i = 0; i < len; i++) {
		const key = aKeys[i]

		if (objA[key] !== objB[key]) {
			return false
		}
	}

	return true
}
