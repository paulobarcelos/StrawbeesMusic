const fs = require('fs').promises
const path = require('path')

const rimraf = async dirPath => {
	try {
		await fs.access(dirPath)
		const dirStat = await fs.lstat(dirPath)
		if (!dirStat.isDirectory()) {
			await fs.unlink(dirStat)
			return
		}
		const list = await fs.readdir(dirPath)
		await Promise.all(list.map(async (entry) => {
			const entryPath = path.join(dirPath, entry)
			const stat = await fs.lstat(entryPath)
			if (stat.isDirectory()) {
				await rimraf(entryPath)
			} else {
				await fs.unlink(entryPath)
			}
		}))
		await fs.rimraf(dirPath)
	} catch (e) {}
}

module.exports = rimraf
