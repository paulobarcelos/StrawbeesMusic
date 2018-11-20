import { createSelector } from 'reselect'
import urlVarsSelector from 'src/selectors/urlVarsSelector'

export default (key) => createSelector(
	[
		urlVarsSelector(),
	],
	(
		urlVars
	) => urlVars[key] || ''
)
