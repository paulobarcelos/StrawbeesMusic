export default () => (state) =>
	(
		state.setup &&
		state.setup.locales
	) || []
