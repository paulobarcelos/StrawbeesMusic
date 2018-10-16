import generateAction from 'src/utils/generateAction'
import {
	SETUP_SET,
	SETUP_SET_QUERY,
	SETUP_SET_AS_PATH,
	SETUP_SET_URL_VARS,
	SETUP_SET_LOCALES,
	SETUP_SET_ROUTES,
	SETUP_SET_STRINGS,
	SETUP_SET_DISPLAY_PAGE_LOADER,
	SETUP_SET_DISPLAY_ERROR,
} from 'src/constants/actionTypes'

export const setSetup = generateAction(SETUP_SET)
export const setQuery = generateAction(SETUP_SET_QUERY)
export const setAsPath = generateAction(SETUP_SET_AS_PATH)
export const setUrlVars = generateAction(SETUP_SET_URL_VARS)
export const setLocales = generateAction(SETUP_SET_LOCALES)
export const setRoutes = generateAction(SETUP_SET_ROUTES)
export const setStrings = generateAction(SETUP_SET_STRINGS)
export const setDisplayPageLoader = generateAction(SETUP_SET_DISPLAY_PAGE_LOADER)
export const setDisplayError = generateAction(SETUP_SET_DISPLAY_ERROR)
