import { createSelector } from 'reselect'
import localesSelector from 'src/selectors/localesSelector'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'

export default () => createSelector(
	[
		localesSelector(),
		queryLocaleSelector(),
	],
	(
		locales,
		queryLocale,
	) => locales.filter(
		locale => locale.id === queryLocale
	).pop()
)
