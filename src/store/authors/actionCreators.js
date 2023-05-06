import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

export const getAuthors = (payload) => {
	return {
		type: GET_AUTHORS,
		payload,
	};
};

export const addAuthor = (payload) => {
	return {
		type: ADD_AUTHOR,
		payload,
	};
};
