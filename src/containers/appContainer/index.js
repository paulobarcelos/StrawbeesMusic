import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import DocumentHead from 'next/head'
import { connect } from 'react-redux'
import parseUrlVars from 'src/utils/parseUrlVars'
import loadStaticData from 'src/utils/loadStaticData'
import PageContainer from 'src/containers/pageContainer'
import PageError from 'src/components/pageError'
import TrackingManager from 'src/containers/trackingManager'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class AppContainer extends React.Component {
	static async getInitialProps({
		query,
		asPath,
		isServer,
		store,
	}) {
		const {
			routesLoaded,
			localesLoaded,
			stringsLoaded,
			setSetup,
			setRoutes,
			setLocales,
			setStrings,
			setDisplayPageLoader,
		} = mergeProps(
			mapStateToProps()(store.getState(), {}),
			mapDispatchToProps(store.dispatch)
		)

		if (!isServer) {
			setSetup({
				query,
				asPath,
				urlVars : parseUrlVars(asPath)
			})
		} else {
			setSetup({
				query,
			})
		}
		if (!routesLoaded) {
			setRoutes(await loadStaticData('routes.json'))
		}
		if (!localesLoaded) {
			setLocales(await loadStaticData('locales/index.json'))
		}
		if (!stringsLoaded[query.locale]) {
			setStrings({
				locale : query.locale,
				data   : await loadStaticData(`locales/${query.locale}.json`)
			})
		}
		if (isServer) {
			// show the initial page loader
			setDisplayPageLoader(true)
		}
	}

	async componentDidMount() {
		const {
			setSetup,
			setDisplayPageLoader,
		} = this.props

		// adjust as path on first render
		setSetup({
			asPath  : Router.router.asPath,
			urlVars : parseUrlVars(Router.router.asPath),
		})

		// hide the initial page loader
		setDisplayPageLoader(false)
	}

	render() {
		const {
			displayPageLoader,
			displayError,
		} = this.props

		return (
			<div className="root app">
				<DocumentHead>
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
					<link rel="manifest" href="/static/site.webmanifest"/>
					<link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
					<link rel="shortcut icon" href="/static/favicon/favicon.ico"/>
					<meta name="msapplication-TileColor" content="#2d89ef"/>
					<meta name="msapplication-config" content="/static/favicon/browserconfig.xml"/>
					<meta name="theme-color" content="#ffffff"/>
				</DocumentHead>

				<style jsx>{`
					@font-face {
						font-family: 'Text';
						font-display: swap;
						src: url('/static/fonts/BrandonText-Regular.woff2') format('woff2'),
							url('/static/fonts/BrandonText-Regular.woff') format('woff');
						font-weight: normal;
						font-style: normal;
					}
					:global(body) {
						margin: 0;
						font-family: 'Text', sans-serif;
						font-size: 16px;
						line-height: 1.5;
						overscroll-behavior: none;
					}
					:global(*) {
						-webkit-tap-highlight-color: rgba(0,0,0,0);
					}
				`}</style>

				<TrackingManager />
				{displayError ?
					<PageError statusCode={displayError} />
					:
					<PageContainer />
				}
			</div>
		)
	}
}

AppContainer.propTypes = {
	setSetup             : PropTypes.func,
	setRoutes            : PropTypes.func,
	setLocales           : PropTypes.func,
	setStrings           : PropTypes.func,
	setDisplayPageLoader : PropTypes.func,
	displayPageLoader    : PropTypes.bool,
	displayError         : PropTypes.PropTypes.oneOf([false, 404, 500]),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(AppContainer)
