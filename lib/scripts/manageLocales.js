const path = require('path')
const fs = require('fs').promises
const rimraf = require('../utils/rimraf')
const locales = require('../../locales/index.json')

const loadMarkDown = async (id) => {
	try {
		const mdFiles = (await fs.readdir(path.join('locales', id)))
			.filter(file => file.endsWith('.md'))

		const md = {}

		for (let i = 0; i < mdFiles.length; i++) {
			const file = mdFiles[i]
			md[file] = (await fs.readFile(path.join('locales', id, file))).toString()
		}

		return md
	} catch (error) {
		return {}
	}
}

module.exports = async () => {
	await rimraf(path.join('static', 'locales'))
	await fs.mkdir(path.join('static', 'locales'), { recursive : true })
	await fs.writeFile(path.join('static', 'locales', 'index.json'), JSON.stringify(locales, null, '\t'))
	locales.forEach(async ({ id, fallback }) => {
		const fallbackLocale = locales.filter(
			locale => locale.id === fallback
		).pop()

		/* eslint-disable global-require */
		/* eslint-disable import/no-dynamic-require */
		const base = fallbackLocale ? require(path.join('..', '..', 'locales', `${fallbackLocale.id}.json`)) : {}
		const current = require(path.join('..', '..', 'locales', `${id}.json`))
		/* eslint-enable global-require */
		/* eslint-enable import/no-dynamic-require */

		// load .md files from locale folders
		const baseMdFiles = fallbackLocale ? await loadMarkDown(fallbackLocale.id) : {}
		const currentMdFiles = await loadMarkDown(id)

		const computed = {
			...base,
			...baseMdFiles,
			...current,
			...currentMdFiles
		}
		await fs.writeFile(path.join('static', 'locales', `${id}.json`), JSON.stringify(computed, null, '\t'))
	})
}
