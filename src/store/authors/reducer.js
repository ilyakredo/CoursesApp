import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

const defaultState = {
	authors: [],
};

export const authorsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_AUTHORS:
			return {
				...state,
				authors: action.payload.authors,
			};
		case ADD_AUTHOR:
			return {
				...state,
				authors: [...state.authors, action.payload.author],
			};
		default:
			return state;
	}
};
