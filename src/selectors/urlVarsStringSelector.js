import { createSelector } from 'reselect'
import urlVarsSelector from 'src/selectors/urlVarsSelector'

export default () => createSelector(
	[
		urlVarsSelector(),
	],
	(
		urlVars
	) => {
		const totalUrlVars = Object.keys(urlVars).length
		if (totalUrlVars) {
			return Object.keys(urlVars).reduce(
				(queryString, key, index) =>
					`${queryString}${key}=${urlVars[key]}${index !== (totalUrlVars - 1) ? '&' : ''}`,
				'?'
			)
		}
		return ''
	}
)
