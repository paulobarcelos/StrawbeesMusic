const s3 = require('s3')
const path = require('path')

// eslint-disable-next-line import/no-dynamic-require
const awsConfig = require(`../../aws-config-${process.env.CONFIG || 'dev'}.json`)

const client = s3.createClient({
	s3Options : {
		accessKeyId     : awsConfig.key,
		secretAccessKey : awsConfig.secret,
		region          : awsConfig.region,
	}
})

module.exports = () => new Promise((resolve, reject) => {
	const uploader = client.uploadDir({
		localDir      : 'out',
		deleteRemoved : true,
		s3Params      : {
			Bucket : awsConfig.bucket
		},
		getS3Params : (localFile, stat, callback) => {
			let CacheControl
			if (path.basename(localFile) === 'service-worker.js' ||
				localFile.indexOf(path.join('out', 'workbox-') !== -1)) {
				// never cache the service workers
				CacheControl = 'no-cache'
			} else {
				switch (path.extname(localFile)) {
					case '.html':
					case '.json':
						// cache for 2 minutes
						CacheControl = 'max-age=120, public, no-transform'
						break
					default:
						// cache "forever"
						CacheControl = 'max-age=604800, public, no-transform'
				}
			}
			// eslint-disable-next-line no-console
			console.log(`Uploading -> ${localFile}`)
			callback(null, { CacheControl })
		}
	})
	uploader.on('error', err => reject(err))
	uploader.on('end', () => resolve())
})
