import React from 'react'
import DocumentHead from 'next/head'
import Synth from 'src/components/synth'
import StrawbeesMusicLogo from 'src/assets/icons/logos/strawbeesMusic.svg'

class Page extends React.Component {
	state = {
		presets : null
	}

	async componentDidMount() {
		// Load presets
		const presets = await(await fetch('/static/presets.json')).json()
		this.setState({ presets })
	}

	render() {
		const {
			presets
		} = this.state

		return (
			<div className='root indexPage'>
				<DocumentHead>
					<title>Strawbees Music</title>
					<link rel="canonical" href="" />
					<meta property="og:title" content="Strawbees Music" />
					<meta property="og:url" content="" />
					<meta property="og:description" content="Play music!" />
					<meta property="og:image" content="" />
					<meta property="og:type" content="website" />

					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png"/>
					<link rel="manifest" href="/static/favicons/site.webmanifest"/>
					<link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
					<link rel="shortcut icon" href="/static/favicons/favicon.ico"/>
					<meta name="msapplication-TileColor" content="#2d89ef"/>
					<meta name="msapplication-config" content="/static/favicons/browserconfig.xml"/>
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
					.root {
						position: fixed;
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
					}
					.header {
						background-color: #1299ff;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						padding: 5vh;
					}
					.header :global(svg) {
						height: auto;
						width: 40vh;
					}
					.root :global(.synth) {
						flex: 1;
					}
					@media (max-aspect-ratio: 12/10) {
						.header {
							padding: 5vw;
						}
						.header :global(svg) {
							width: 40vw;
						}
					}
				`}</style>

				<div className='header'>
					<StrawbeesMusicLogo/>
				</div>
				{presets &&
					<Synth presets={presets}/>
				}
			</div>
		)
	}
}
export default Page
