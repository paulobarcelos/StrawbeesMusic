import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import makeStore from 'src/store'


// register the service worker
if (process.browser && process.env.NODE_ENV === 'production') {
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/service-worker.js')
		})
	}
}

class NextApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps : {
				// Call page-level getInitialProps
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
			}
		}
	}

	render() {
		const { Component, pageProps, store } = this.props
		return (
			<Container>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		)
	}
}

export default withRedux(
	makeStore
)(NextApp)
