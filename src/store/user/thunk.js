import { login, logout } from './actionCreators';

export const authHandler = (token) => async (dispatch) => {
	const responseAuth = await fetch('http://localhost:4000/users/me', {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	const authResult = await responseAuth.json();
	if (authResult.successful) {
		const payload = {
			user: {
				name: authResult.result.name,
				email: authResult.result.email,
				token: token,
				role: authResult.result.role,
			},
		};
		dispatch(login(payload));
		return authResult;
	}
};

export const authorized = (user) => async (dispatch) => {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	if (result.successful) {
		localStorage.setItem('token', result.result);
		return dispatch(authHandler(result.result));
	} else {
		return result;
	}
};

export const logoutHandler =
	(navigate, setIsLogged, user) => async (dispatch) => {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: user.token,
			},
		});
		if (response.status === 200) {
			localStorage.removeItem('token');
			dispatch(logout());
			setIsLogged(false);
			navigate('/login');
		}
	};
