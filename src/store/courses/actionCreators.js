import {
	ADD_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from './actionTypes';

export const getCourses = (payload) => {
	return {
		type: GET_COURSES,
		payload,
	};
};

export const addCourse = (payload) => {
	return {
		type: ADD_COURSE,
		payload,
	};
};

export const deleteCourseAction = (payload) => {
	return {
		type: DELETE_COURSE,
		payload,
	};
};

export const updateCourseAction = (payload) => {
	return {
		type: UPDATE_COURSE,
		payload,
	};
};
