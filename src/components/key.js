import React from 'react'
import PropTypes from 'prop-types'

class Key extends React.Component {
	onDown = () => {
		const {
			onKeyDown,
			keyCode : key,
		} = this.props
		onKeyDown({ key })
	}
	onUp = () => {
		const {
			onKeyUp,
			keyCode : key,
		} = this.props
		onKeyUp({ key })
	}
	render() {
		const {
			active,
			color,
			keyCode : key,
		} = this.props

		const events = {}
		if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
			events.onTouchStart = this.onDown
			events.onTouchEnd = this.onUp
		} else {
			events.onMouseDown = this.onDown
			events.onMouseUp = this.onUp
		}

		return (
			<div className={`root key ${active ? 'active' : ''}`}
				{...events}>
				<style jsx>{`
					.root {
						box-sizing: border-box;
						background-color: #FFF;
						border: solid 0.8vh ${color};
						border-radius: 2vh;
						margin: 1vh;
						padding: 0 0 0 2.5vh;
						font-size: 10vh;
						color: ${color};
						width: 20vh;
						height: 20vh;
						outline: none;
						-webkit-tap-highlight-color: rgba(0,0,0,0);
						text-transform: uppercase;
						user-select: none;
					}
					.root.active {
						background-color: ${color};
						color: #fff;
					}
					@media (max-aspect-ratio: 15/10) {
						.root {
							border-width: 0.8vw;
							border-radius: 1.5vw;
							font-size: 7.5vw;
							margin: 0.75vw;
							width: 15vw;
							height: 15vw;
						}
					}
				`}</style>
				{key}
			</div>
		)
	}
}

Key.propTypes = {
	keyCode   : PropTypes.string,
	color     : PropTypes.string,
	active    : PropTypes.bool,
	onKeyDown : PropTypes.func,
	onKeyUp   : PropTypes.func,
}
export default Key
