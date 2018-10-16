import React from 'react'
import PropTypes from 'prop-types'
import StartAudioContext from 'startaudiocontext'
import Key from 'src/components/key'
import InstrumentSelector from 'src/components/instrumentSelector'
import InstrumentsIcon from 'src/assets/icons/general/instruments.svg'

class Synth extends React.Component {
	state = {
		loaded      : false,
		active      : false,
		instrument  : 0,
		pressedKeys : {}
	}

	constructor(props) {
		super(props)
		this.mobileActivatorRef = React.createRef()
		this.pressedKeys = {}
	}

	async componentDidMount() {
		if(typeof window === 'undefined') {
			return
		}

		// Setup Tone.js
		this.Tone = require('tone')
		this.Tone.Buffer.on('load', this.setBufferLoaded)

		// Init audio context (with user gesture)
		StartAudioContext(
			this.Tone.context,
			this.mobileActivatorRef.current,
			this.init
		)
	}

	componentWillUnmount() {
		this.disposeInstrument()
		this.Tone.Buffer.off('load', this.setBufferLoaded)
	}

	setBufferLoaded = () => {
		this.setState({ loaded : true })
	}

	init = () => {
		this.setState({ active : true })
		this.setInstrument(0)
	}

	setInstrument = (instrument) => {
		const {
			presets
		} = this.props
		this.disposeInstrument()
		this.setState({
			instrument,
			pressedKeys : {}
		})
		const { samples, options, effects } = presets[instrument]

		this.sampler = new this.Tone.Sampler(samples, options)
		if (effects && effects.length) {
			this.effects = []
			effects.forEach(({ name, options }, i) => {
				this.effects[i] = new this.Tone[name](options)
				if (i === 0) {
					this.effects[i].toMaster()
				} else {
					this.effects[i].connect(this.effects[i - 1])
				}
			})
			this.sampler.connect(this.effects[this.effects.length - 1])
		} else {
			this.sampler.toMaster()
		}
	}

	disposeInstrument = () => {
		if (!this.sampler) {
			return
		}
		if (this.effects) {
			this.effects.forEach(effect => effect.dispose())
			delete this.effects
		}
		this.sampler.dispose()
		this.sampler.releaseAll()
		delete this.sampler
		this.pressedKeys = {}
	}

	onKeyDown = ({ key }) => {
		key = key.toUpperCase()
		const {
			presets
		} = this.props

		const {
			instrument,
			loaded,
			pressedKeys
		} = this.state

		if (!loaded) {
			return
		}

		const setKey = presets[instrument].keys.filter(setKey => setKey.key.toUpperCase() === key).pop()
		if (!setKey) {
			return
		}

		if (pressedKeys[key]) {
			return
		}
		this.setState({
			pressedKeys : {
				...pressedKeys,
				[key] : true
			}
		})

		setKey.notes.forEach(({ note, duration, time, velocity }) => {
			console.log('attack', note, duration, time, velocity)
			if (typeof duration === 'undefined') {
				this.sampler.triggerAttack(note, time, velocity)
			} else {
				this.sampler.triggerAttackRelease(note, duration, time, velocity)
			}

		})
	}

	onKeyUp = ({ key }) => {
		key = key.toUpperCase()
		const {
			presets
		} = this.props

		const {
			instrument,
			loaded,
			pressedKeys
		} = this.state

		if (!loaded) {
			return
		}

		const setKey = presets[instrument].keys.filter(setKey => setKey.key.toUpperCase() === key).pop()
		if (!setKey) {
			return
		}

		if (!pressedKeys[key]) {
			return
		}
		this.setState({
			pressedKeys : {
				...pressedKeys,
				[key] : false
			}
		})

		setKey.notes.forEach(({ note, time }) => {
			console.log('release', note)
			this.sampler.triggerRelease(note)
		})
	}

	render() {
		const {
			onKeyDown,
			onKeyUp,
			setInstrument,
			mobileActivatorRef
		} = this

		const {
			presets
		} = this.props

		const {
			loaded,
			active,
			instrument,
			pressedKeys
		} = this.state


		const { keys } = presets[instrument]

		return (
			<div className={`root synth ${active ? 'active' : ''}`}
				tabIndex='0'
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						outline: none;
						overflow: hidden;
						background-color: #f0f0f0;
					}
					.activator {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(255, 110, 167, 0.8);
						color: #fff;
						font-size: 8vw;
						z-index: 10;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
					}
					.root.active .activator,
					.root.active:focus .activator,
					.root.active:focus-within .activator {
						display: none;
					}
					.root.active:not(:focus) .activator,
					.root.active:not(:focus-within) .activator {
						display: flex !important;
					}
					.icon :global(svg) {
						width: 20vh;
						height: auto;
						margin-bottom: 2vh;
					}
					.keys {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						flex-wrap: wrap;
					}
					@media (max-aspect-ratio: 15/10) {
						.icon :global(svg) {
							width: 24vw;
							margin-bottom: 2.4vw;
						}
					}
				`}</style>
				<div className='activator'
					ref={mobileActivatorRef}>
					{'Click here to play'}
				</div>
				<div className='icon'>
					<InstrumentsIcon />
				</div>
				<InstrumentSelector
					instruments={presets}
					instrument={instrument}
					onSetInstrument={setInstrument}
				/>
				<div className='keys'>
					{keys.map(({ key, color }) =>
						<Key
							key={key}
							keyCode={key}
							color={color}
							onKeyDown={onKeyDown}
							onKeyUp={onKeyUp}
							active={pressedKeys[key.toUpperCase()] ? true : false}
						/>
					)}
				</div>
			</div>
		)
	}
}

Synth.propTypes = {
	presets : PropTypes.arrayOf(PropTypes.shape({
		name    : PropTypes.string.isRequired,
		samples : PropTypes.object,
		options : PropTypes.shape({
			attack  : PropTypes.number,
			release : PropTypes.number,
			baseUrl : PropTypes.string,
		}),
		effects : PropTypes.arrayOf(PropTypes.shape({
			name    : PropTypes.string,
			options : PropTypes.object,
		})),
		keys    : PropTypes.arrayOf(PropTypes.shape({
			key   : PropTypes.string.isRequired,
			color : PropTypes.string.isRequired,
			notes : PropTypes.arrayOf(PropTypes.shape({
				note     : PropTypes.string,
				duration : PropTypes.string,
				time     : PropTypes.string,
				velocity : PropTypes.string,
			})).isRequired,
		})).isRequired
	})).isRequired
}

export default Synth
