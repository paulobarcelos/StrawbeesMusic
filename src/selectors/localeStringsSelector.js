import { createSelector } from 'reselect'
import stringsSelector from 'src/selectors/stringsSelector'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'

export default () => createSelector(
	[
		stringsSelector(),
		queryLocaleSelector(),
	],
	(
		strings,
		queryLocale,
	) => strings[queryLocale]
)
