import {
	ADD_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

const defaultState = {
	courses: [],
};

export const coursesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_COURSES:
			return {
				...state,
				courses: action.payload.courses,
			};
		case ADD_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload.course],
			};
		case DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter(
					(course) => course.id !== action.payload.id
				),
			};
		case UPDATE_COURSE:
			return {
				...state,
				courses: state.courses.map((course) => {
					return course.id === action.payload.course.id
						? action.payload.course
						: course;
				}),
			};
		default:
			return state;
	}
};
