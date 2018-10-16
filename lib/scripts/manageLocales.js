const rmdir = require('../utils/rmdir')
const mkdir = require('../utils/mkdir')
const readdir = require('../utils/readdir')
const readFile = require('../utils/readFile')
const saveJson = require('../utils/saveJson')
const locales = require('../../locales/index.json')

const loadMarkDown = async (id) => {
	try {
		const mdFiles = (await readdir(`locales/${id}`))
			.filter(file => file.endsWith('.md'))

		const md = {}

		for (let i = 0; i < mdFiles.length; i++) {
			const file = mdFiles[i]
			md[file] = await readFile(`locales/${id}/${file}`)
		}

		return md
	} catch (error) {
		return {}
	}
}

module.exports = async () => {
	await rmdir('static/locales')
	await mkdir('static/locales')
	await saveJson('static/locales/index.json', locales)
	locales.forEach(async ({ id, fallback }) => {
		const fallbackLocale = locales.filter(
			locale => locale.id === fallback
		).pop()

		/* eslint-disable global-require */
		/* eslint-disable import/no-dynamic-require */
		const base = fallbackLocale ? require(`../../locales/${fallbackLocale.id}.json`) : {}
		const current = require(`../../locales/${id}.json`)
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
		await saveJson(`static/locales/${id}.json`, computed)
	})
}
