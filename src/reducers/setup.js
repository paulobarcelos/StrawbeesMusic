import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
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

const query = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_QUERY:
			return {
				...payload
			}
		case SETUP_SET:
			if (typeof payload.query !== 'undefined') {
				return {
					...payload.query
				}
			}
			return state
		default:
			return state
	}
}
const asPath = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_AS_PATH:
			return payload
		case SETUP_SET:
			if (typeof payload.asPath !== 'undefined') {
				return payload.asPath
			}
			return state
		default:
			return state
	}
}
const urlVars = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_URL_VARS:
			return {
				...payload
			}
		case SETUP_SET:
			if (typeof payload.urlVars !== 'undefined') {
				return {
					...payload.urlVars
				}
			}
			return state
		default:
			return state
	}
}
const locales = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_LOCALES:
			return [
				...payload
			]
		case SETUP_SET:
			if (typeof payload.locales !== 'undefined') {
				return [
					...payload.locales
				]
			}
			return state
		default:
			return state
	}
}
const localesLoaded = (state = false, { type }) => {
	switch (type) {
		case SETUP_SET_LOCALES:
			return true
		default:
			return state
	}
}
const routes = (state = null, { type, payload }) => {
	switch (type) {
		case SETUP_SET_ROUTES:
			return {
				...payload
			}
		case SETUP_SET:
			if (typeof payload.routes !== 'undefined') {
				return {
					...payload.routes
				}
			}
			return state
		default:
			return state
	}
}
const routesLoaded = (state = false, { type }) => {
	switch (type) {
		case SETUP_SET_ROUTES:
			return true
		default:
			return state
	}
}
const strings = (state = {}, { type, payload }) => {
	switch (type) {
		case SETUP_SET_STRINGS: {
			const newState = {
				...state
			}
			newState[payload.locale] = payload.data
			return newState
		}
		default:
			return state
	}
}
const stringsLoaded = (state = {}, { type, payload }) => {
	switch (type) {
		case SETUP_SET_STRINGS: {
			const newState = {
				...state
			}
			newState[payload.locale] = true
			return newState
		}
		default:
			return state
	}
}

const displayPageLoader = generateReducer(SETUP_SET_DISPLAY_PAGE_LOADER, false)
const displayError = generateReducer(SETUP_SET_DISPLAY_ERROR, false)

export default combineReducers({
	query,
	asPath,
	urlVars,
	locales,
	localesLoaded,
	routes,
	routesLoaded,
	strings,
	stringsLoaded,
	displayPageLoader,
	displayError,
})
