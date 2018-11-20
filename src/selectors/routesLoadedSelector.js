export default () => (state) =>
	(
		state &&
		state.setup &&
		state.setup.routesLoaded
	) || false
