import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PageError from 'src/components/pageError'
import PageHomeContainer from 'src/containers/pageHomeContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


const PageContainer = (props) => {
	const components = {
		home                 : PageHomeContainer,
	}
	const RefComponent = components[props.queryRef] || PageError
	return (
		<>
			<main role='main' className='root page'>
				<style jsx>{`
					.root {
						overflow-y: auto;
						-webkit-overflow-scrolling: touch;
						overscroll-behavior: none;
						display: flex;
						flex-direction: column;
						align-items: stretch;
					}
				`}</style>
				<RefComponent {...props}/>
			</main>
		</>
	)
}

PageContainer.propTypes = {
	queryRef : PropTypes.oneOf([
		'error',
		'home',
	])
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageContainer)
