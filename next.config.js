const routes = require('./static/routes')

const configMode = process.env.CONFIG || 'dev'
const publicRuntimeConfig = {
	dev : {
		CANONICAL_URL : 'http://music-dev.strawbees.com:3000',
		GAID          : 'XXXXXXXXXXXX',
	},
	stage : {
		CANONICAL_URL : 'https://music-stage.strawbees.com',
		GAID          : 'XXXXXXXXXXXX',
	},
	production : {
		CANONICAL_URL : 'https://music.strawbees.com',
		GAID          : 'XXXXXXXXXXXX',
	},
	desktop : {
		CANONICAL_URL : 'https://music.strawbees.com',
		GAID          : 'XXXXXXXXXXXX',
	}
}
// eslint-disable-next-line no-console
console.log('Using config -> ', configMode)

module.exports = {
	exportPathMap             : () => routes,
	publicRuntimeConfig       : publicRuntimeConfig[configMode],
	useFileSystemPublicRoutes : false,
}
