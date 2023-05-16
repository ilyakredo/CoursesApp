import { userReducer } from '../user/reducer';
import { login, logout } from '../user/actionCreators';
import { coursesReducer } from '../courses/reducer';
import {
	addCourse,
	deleteCourseAction,
	getCourses,
	updateCourseAction,
} from '../courses/actionCreators';
import { authorsReducer } from '../authors/reducer';
import { addAuthor, getAuthors } from '../authors/actionCreators';
import {
	ADDED_AUTHOR_STATE,
	ADD_AUTHOR_PAYLOAD,
	AUTHORS_INIT_STATE,
	AUTHORS_PAYLOAD,
	AUTHORS_STATE,
	COURSES_ADDED_STATE,
	COURSES_INIT_STATE,
	COURSES_PAYLOAD,
	COURSES_STATE,
	COURSE_PAYLOAD,
	COURSE_UPDATE_PAYLOAD,
	DELETE_COURSE_PAYLOAD,
	UPDATED_COURSES_STATE,
	USER_INIT_STATE,
	USER_PAYLOAD,
	USER_STATE,
} from './constants';

test('Should return the initial state', () => {
	expect(userReducer(undefined, { type: undefined })).toEqual(USER_INIT_STATE);
});

test('Should handle an authorization of a user', () => {
	expect(userReducer(USER_INIT_STATE, login(USER_PAYLOAD))).toEqual(USER_STATE);
});

test('Should handle a logout of a user', () => {
	expect(userReducer(USER_STATE, logout())).toEqual(USER_INIT_STATE);
});

test('Should handle adding courses list to the store', () => {
	expect(
		coursesReducer(COURSES_INIT_STATE, getCourses(COURSES_PAYLOAD))
	).toEqual(COURSES_STATE);
});

test('Should handle adding new course to the store', () => {
	expect(coursesReducer(COURSES_STATE, addCourse(COURSE_PAYLOAD))).toEqual(
		COURSES_ADDED_STATE
	);
});

test('Should handle deleting course from the store', () => {
	expect(
		coursesReducer(
			COURSES_ADDED_STATE,
			deleteCourseAction(DELETE_COURSE_PAYLOAD)
		)
	).toEqual(COURSES_STATE);
});

test('Should handle updating course at the store', () => {
	expect(
		coursesReducer(
			COURSES_ADDED_STATE,
			updateCourseAction(COURSE_UPDATE_PAYLOAD)
		)
	).toEqual(UPDATED_COURSES_STATE);
});

test('Should handle loading authors list to the store', () => {
	expect(
		authorsReducer(AUTHORS_INIT_STATE, getAuthors(AUTHORS_PAYLOAD))
	).toEqual(AUTHORS_STATE);
});

test('Should handle loading authors list to the store', () => {
	expect(authorsReducer(AUTHORS_STATE, addAuthor(ADD_AUTHOR_PAYLOAD))).toEqual(
		ADDED_AUTHOR_STATE
	);
});
