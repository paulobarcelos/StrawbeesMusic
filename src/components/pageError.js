import PropTypes from 'prop-types'

const PageError = ({
	statusCode,
}) => <div className='root pageError'>
	<style jsx>{`
		.root {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
	`}</style>
	<div>{statusCode}</div>
</div>

PageError.defaultProps = {
	statusCode : 404
}

PageError.propTypes = {
	statusCode : PropTypes.number
}


export default PageError
