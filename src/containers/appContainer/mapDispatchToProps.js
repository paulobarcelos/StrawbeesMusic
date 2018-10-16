import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setSetup,
	setRoutes,
	setLocales,
	setStrings,
	setDisplayPageLoader,
} from 'src/actions/setup'

export default autobindDispatchToActionCreators({
	setSetup,
	setRoutes,
	setLocales,
	setStrings,
	setDisplayPageLoader,
})
