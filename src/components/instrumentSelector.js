import React from 'react'
import PropTypes from 'prop-types'
import ArrowLeft from 'src/assets/icons/general/arrowLeft.svg'
import ArrowRight from 'src/assets/icons/general/arrowRight.svg'

class InstrumentSelector extends React.Component {
	onPrev = () => {
		const {
			instruments,
			onSetInstrument
		} = this.props
		let {
			instrument
		} = this.props
		instrument--
		if (instrument < 0) {
			instrument = instruments.length - 1
		}
		onSetInstrument(instrument)
	}

	onNext = () => {
		const {
			instruments,
			onSetInstrument
		} = this.props
		let {
			instrument
		} = this.props
		instrument++
		if (instrument > instruments.length - 1) {
			instrument = 0
		}
		onSetInstrument(instrument)
	}

	render() {
		const {
			instrument,
			instruments
		} = this.props

		return (
			<div className='root instrumentSelector'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-bottom: 5vh;
					}
					.arrow :global(svg) {
						width: 8vh;
						display: block;
						cursor: pointer;
					}
					.name {
						background-color: #939393;
						color: #fff;
						font-size: 5vh;
						letter-spacing: 0.5vh;
						text-transform: uppercase;
						border-radius: 1vh;
						height: 7vh;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						width: 80vh;
					}
					@media (max-aspect-ratio: 15/10) {
						.root {
							margin-bottom: 5vw;
						}
						.arrow :global(svg) {
							width: 8vw;
						}
						.name {
							font-size: 5vw;
							letter-spacing: 0.5vw;
							border-radius: 1vw;
							height: 7vw;
							width: 80vw;
						}
					}
				`}</style>
				<div className='arrow'
					role='button'
					onKeyUp={({ key }) => {
						if (key === 'Enter') {
							this.onPrev()
						}
					}}
					onClick={this.onPrev}>
					<ArrowLeft/>
				</div>
				<div className='name'>
					{instruments && instruments[instrument].name}
				</div>
				<div className='arrow'
					role='button'
					onKeyUp={({ key }) => {
						if (key === 'Enter') {
							this.onNext()
						}
					}}
					onClick={this.onNext}>
					<ArrowRight/>
				</div>
			</div>
		)
	}
}

InstrumentSelector.propTypes = {
	instruments : PropTypes.arrayOf(PropTypes.shape({
		name : PropTypes.string,
	})),
	instrument      : PropTypes.number,
	onSetInstrument : PropTypes.func
}
export default InstrumentSelector
