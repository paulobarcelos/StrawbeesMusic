import { bindActionCreators } from 'redux'

export default (actionCreators) => (dispatch) =>
	Object.keys(actionCreators).reduce((acc, name) => {
		acc[name] = bindActionCreators(actionCreators[name], dispatch)
		return acc
	}, {})
