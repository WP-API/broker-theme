import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorComponent from './Error';
import ContentWrapper from '../ContentWrapper';

import './index.css';

export default function Connect( props ) {
	return <ContentWrapper className="Connect">
		<ErrorComponent />
	</ContentWrapper>;
}
