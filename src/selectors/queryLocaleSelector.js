export default () => (state) =>
	state &&
	state.setup &&
	state.setup.query &&
	state.setup.query.locale
