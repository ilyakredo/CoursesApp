import { addAuthor, getAuthors } from './actionCreators';

export const loadAuthors = () => async (dispatch) => {
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const authorsResponse = await response.json();
	if (authorsResponse.successful) {
		const authorsPayload = {
			authors: authorsResponse.result,
		};
		dispatch(getAuthors(authorsPayload));
	} else {
		return [];
	}
};

export const fetchCreateAuthor = (payload, token) => async (dispatch) => {
	const response = await fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify(payload.author),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	if (result.successful) {
		dispatch(addAuthor({ author: result.result }));
		return result.result;
	}
};
