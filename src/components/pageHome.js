import React from 'react'
import PropTypes from 'prop-types'
import Synth from 'src/components/synth'
import DocumentHead from 'next/head'
import StrawbeesMusicLogo from 'src/assets/icons/logos/strawbeesMusic.svg'
import preloadedPresets from 'root/static/presets.json'

class PageHome extends React.Component {
	state = {
		presets : preloadedPresets
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

		const {
			ogTitle,
			ogUrl,
			ogDescription,
			ogImage,
			ogType
		} = this.props

		return (
			<div className='root pageHome'>
				<DocumentHead>
					{ogTitle &&
						<title>{ogTitle}</title>
					}
					{ogUrl &&
						<link rel="canonical" href={ogUrl} />
					}
					{ogTitle &&
						<meta property="og:title" content={ogTitle} />
					}
					{ogUrl &&
						<meta property="og:url" content={ogUrl} />
					}
					{ogDescription &&
						<meta property="og:description" content={ogDescription} />
					}
					{ogImage &&
						<meta property="og:image" content={ogImage} />
					}
					{ogType &&
						<meta property="og:type" content={ogType} />
					}
				</DocumentHead>

				<style jsx>{`
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

PageHome.propTypes = {
	ogTitle       : PropTypes.string,
	ogUrl         : PropTypes.string,
	ogDescription : PropTypes.string,
	ogImage       : PropTypes.string,
	ogType        : PropTypes.string
}


export default PageHome
