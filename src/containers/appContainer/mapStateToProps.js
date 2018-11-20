import { createStructuredSelector } from 'reselect'
import routesLoadedSelector from 'src/selectors/routesLoadedSelector'
import stringsLoadedSelector from 'src/selectors/stringsLoadedSelector'
import localesLoadedSelector from 'src/selectors/localesLoadedSelector'
import setupDisplayPageLoaderSelector from 'src/selectors/setupDisplayPageLoaderSelector'
import setupDisplayErrorSelector from 'src/selectors/setupDisplayErrorSelector'

export default () => createStructuredSelector({
	routesLoaded      : routesLoadedSelector(),
	stringsLoaded     : stringsLoadedSelector(),
	localesLoaded     : localesLoadedSelector(),
	displayPageLoader : setupDisplayPageLoaderSelector(),
	displayError      : setupDisplayErrorSelector(),
})
