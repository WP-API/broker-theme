import {
	LOG_IN_REQUEST,
	LOG_IN,
	LOG_IN_ERROR,
	LOG_OUT_REQUEST,
	LOG_OUT,
	LOG_OUT_ERROR
} from '../actions';

const DEFAULT_STATE = {
	data:       null,
	expiration: null,
	loading:    false,
	nonce:      null,
};

export default function user( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case LOG_IN_REQUEST:
			return {
				...state,
				data: null,
				expiration: null,
				loading: true,
				nonce: null,
			};

		case LOG_IN: {
			const { expiration, nonce } = state;

			return {
				...state,
				loading: false,
				data: action.user,
				expiration,
				nonce,
			};
		}

		case LOG_OUT_ERROR:
		case LOG_IN_ERROR:
			return {
				...state,
				loading: false,
			};

		case LOG_OUT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case LOG_OUT:
			return {
				...state,
				data: null,
				expiration: null,
				loading: false,
				nonce: null,
			};

		default:
			return state;
	}
}
