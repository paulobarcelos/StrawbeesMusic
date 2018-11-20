import { createStructuredSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'

export default () => createStructuredSelector({
	queryRef : queryRefSelector(),
})
