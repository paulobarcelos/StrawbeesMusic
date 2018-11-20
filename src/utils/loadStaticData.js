import nodeFecth from 'isomorphic-unfetch'

const CACHE = {}
export default async file => {
	let data
	if (!CACHE[file]) {
		if (process.browser) {
			data = await (await fetch(`/static/${file}`)).json()
		} else {
			data = await (await nodeFecth(`http://localhost:1338/${file}`)).json()
		}
		CACHE[file] = data
	}
	data = CACHE[file]
	return data
}
