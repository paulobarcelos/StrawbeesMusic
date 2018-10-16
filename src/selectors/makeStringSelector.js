import { createSelector } from 'reselect'
import localeStringsSelector from 'src/selectors/localeStringsSelector'
import s from 'src/utils/s'

export default (key, showKeyIfMissing) => createSelector(
	[
		localeStringsSelector(),
	],
	(
		localeStrings
	) => s(localeStrings, key, showKeyIfMissing)
)
