import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL
	}
} = getConfig()
const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

const makeRefOgSelector = (ref) => createSelector(
	[
		makeStringSelector(`${ref}.url`, false),
		makeStringSelector(`${ref}.og.title`, false),
		makeStringSelector(`${ref}.og.description`, false),
		makeStringSelector(`${ref}.og.image`, false),
		makeStringSelector(`${ref}.og.type`, false),
		makeStringSelector('home.og.title', false),
		makeStringSelector('home.og.description', false),
		makeStringSelector('home.og.image', false)
	],
	(
		refUrl,
		title,
		description,
		image,
		type,
		homeTitle,
		homeDescription,
		homeImage
	) => {
		const relativeImage = (image || homeImage)
		return {
			ogUrl         : `${baseUrl}${refUrl}`,
			ogTitle       : title || homeTitle,
			ogDescription : description || homeDescription,
			ogImage       : relativeImage && `${baseUrl}${relativeImage}`,
			ogType        : type || 'website'
		}
	}
)

export default () => createSelector(
	[
		queryRefSelector(),
		state => state,
	],
	(
		queryRef,
		state,
	) => makeRefOgSelector(queryRef)(state)
)
