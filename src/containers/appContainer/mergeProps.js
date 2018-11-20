export default (stateProps = {}, dispatchProps = {}, ownProps = {}) =>
	Object.assign({}, ownProps, stateProps, dispatchProps)
