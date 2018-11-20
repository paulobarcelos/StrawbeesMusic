export default (targetType, defaultState = null) =>
	(state = defaultState, { type, payload }) => {
		switch (type) {
			case targetType: {
				return typeof payload === 'undefined' ? null : payload
			}
			default:
				return state
		}
	}
