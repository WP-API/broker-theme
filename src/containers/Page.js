import { connect } from 'react-redux';
import withPage from '../lib/withPage';

import Page from '../Page';
import { pages } from '../lib/types';

export default withPage(
	pages,
	state => state.pages,
	props => props.match.params.path
)( Page );
