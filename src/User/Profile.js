import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../Button';
import Form from '../Form';
import ContentWrapper from '../ContentWrapper';

const Profile = props => {
	const { user } = props;

	if ( ! user ) {
		return <Redirect to="/login/" />;
	}

	return <ContentWrapper>
		<h1>Edit Profile</h1>

		<Form>
			<p>
				<label>Name</label>
				<input
					readOnly
					type="text"
					value={ user.name }
				/>
			</p>
			<p>
				<label>Email Address</label>
				<input
					readOnly
					type="email"
					value={ user.email }
				/>
			</p>
			<p>
				<label>Change Password</label>
				<input
					type="password"
				/>
				<span className="description">Only enter a new password if you want to change it.</span>
			</p>

			<Button submit>Update Profile</Button>
		</Form>
	</ContentWrapper>;
}

const mapStateToProps = state => {
	return {
		user: state.user.data,
	};
};

export default connect(
	mapStateToProps
)( Profile );
