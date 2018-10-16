import { createStructuredSelector } from 'reselect'
import setupAsPathSelector from 'src/selectors/setupAsPathSelector'

export default () => createStructuredSelector({
	asPath : setupAsPathSelector(),
})
