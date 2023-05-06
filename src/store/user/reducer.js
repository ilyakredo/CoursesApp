import { LOGIN, LOGOUT } from './actionTypes';

const defaultState = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
		role: '',
	},
};

export const userReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: {
					isAuth: true,
					name: action.payload.user.name,
					email: action.payload.user.email,
					token: action.payload.user.token,
					role: action.payload.user.role,
				},
			};
		case LOGOUT:
			return {
				...state,
				user: {
					isAuth: false,
					name: '',
					email: '',
					token: '',
					role: '',
				},
			};
		default:
			return state;
	}
};
