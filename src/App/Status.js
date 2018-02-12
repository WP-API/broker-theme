import React from 'react';

import Label from '../Label';

export default props => {
	switch ( props.app.status ) {
		case 'draft':
			return <Label color="orange">Draft</Label>;

		case 'pending':
			return <Label color="red">Pending</Label>;

		default:
			return null;
	}
}
