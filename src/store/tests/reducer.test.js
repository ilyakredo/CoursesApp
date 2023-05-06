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

test('should return the initial state', () => {
	expect(userReducer(undefined, { type: undefined })).toEqual({
		user: {
			isAuth: false,
			name: '',
			email: '',
			token: '',
			role: '',
		},
	});
});

test('should handle an authorization of a user', () => {
	const previousState = {
		user: {
			isAuth: false,
			name: '',
			email: '',
			token: '',
			role: '',
		},
	};

	const payload = {
		user: {
			name: 'Test name',
			email: 'Test email',
			token: 'Test token',
			role: 'admin',
		},
	};

	expect(userReducer(previousState, login(payload))).toEqual({
		user: {
			isAuth: true,
			name: 'Test name',
			email: 'Test email',
			token: 'Test token',
			role: 'admin',
		},
	});
});

test('should handle a logout of a user', () => {
	const previousState = {
		user: {
			name: 'Test name',
			email: 'Test email',
			token: 'Test token',
			role: 'admin',
		},
	};

	expect(userReducer(previousState, logout())).toEqual({
		user: {
			isAuth: false,
			name: '',
			email: '',
			token: '',
			role: '',
		},
	});
});

test('should handle adding courses list to the store', () => {
	const previousState = {
		courses: [],
	};

	const payload = {
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: ['firstAuthorId', 'thirdAuthorId'],
				id: 'secondCourseId',
			},
		],
	};

	expect(coursesReducer(previousState, getCourses(payload))).toEqual({
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: ['firstAuthorId', 'thirdAuthorId'],
				id: 'secondCourseId',
			},
		],
	});
});

test('should handle adding new course to the store', () => {
	const previousState = {
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: ['firstAuthorId', 'thirdAuthorId'],
				id: 'secondCourseId',
			},
		],
	};

	const payload = {
		course: {
			title: 'third course name',
			description: 'description for the third course',
			creationDate: '18/7/2020',
			duration: 80,
			authors: ['secondAuthorId', 'thirdAuthorId'],
			id: 'thirdCourseId',
		},
	};

	expect(coursesReducer(previousState, addCourse(payload))).toEqual({
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: ['firstAuthorId', 'thirdAuthorId'],
				id: 'secondCourseId',
			},
			{
				title: 'third course name',
				description: 'description for the third course',
				creationDate: '18/7/2020',
				duration: 80,
				authors: ['secondAuthorId', 'thirdAuthorId'],
				id: 'thirdCourseId',
			},
		],
	});
});

test('should handle deleting course from the store', () => {
	const previousState = {
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: ['firstAuthorId', 'thirdAuthorId'],
				id: 'secondCourseId',
			},
			{
				title: 'third course name',
				description: 'description for the third course',
				creationDate: '18/7/2020',
				duration: 80,
				authors: ['secondAuthorId', 'thirdAuthorId'],
				id: 'thirdCourseId',
			},
		],
	};

	const payload = {
		id: 'secondCourseId',
	};

	expect(coursesReducer(previousState, deleteCourseAction(payload))).toEqual({
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'third course name',
				description: 'description for the third course',
				creationDate: '18/7/2020',
				duration: 80,
				authors: ['secondAuthorId', 'thirdAuthorId'],
				id: 'thirdCourseId',
			},
		],
	});
});

test('should handle updating course at the store', () => {
	const previousState = {
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: ['firstAuthorId', 'thirdAuthorId'],
				id: 'secondCourseId',
			},
			{
				title: 'third course name',
				description: 'description for the third course',
				creationDate: '18/7/2020',
				duration: 80,
				authors: ['secondAuthorId', 'thirdAuthorId'],
				id: 'thirdCourseId',
			},
		],
	};

	const payload = {
		course: {
			title: 'third course name - updated',
			description: 'description for the third course - updated',
			creationDate: '22/2/2019',
			duration: 120,
			authors: ['secondAuthorId', 'thirdAuthorId'],
			id: 'thirdCourseId',
		},
	};

	expect(coursesReducer(previousState, updateCourseAction(payload))).toEqual({
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: ['firstAuthorId', 'secondAuthorId'],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: ['firstAuthorId', 'thirdAuthorId'],
				id: 'secondCourseId',
			},
			{
				title: 'third course name - updated',
				description: 'description for the third course - updated',
				creationDate: '22/2/2019',
				duration: 120,
				authors: ['secondAuthorId', 'thirdAuthorId'],
				id: 'thirdCourseId',
			},
		],
	});
});

test('should handle loading authors list to the store', () => {
	const previousState = {
		authors: [],
	};

	const payload = {
		authors: [
			{
				name: 'author',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author2',
				id: '1c972c52-3198-4098-b6f7-799b45903199',
			},
			{
				name: 'author3',
				id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			},
			{
				name: 'author4',
				id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
			},
			{
				name: 'author5',
				id: '5e0b0f18-32c9-4933-b142-50459b47f09e',
			},
		],
	};

	expect(authorsReducer(previousState, getAuthors(payload))).toEqual({
		authors: [
			{
				name: 'author',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author2',
				id: '1c972c52-3198-4098-b6f7-799b45903199',
			},
			{
				name: 'author3',
				id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			},
			{
				name: 'author4',
				id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
			},
			{
				name: 'author5',
				id: '5e0b0f18-32c9-4933-b142-50459b47f09e',
			},
		],
	});
});

test('should handle loading authors list to the store', () => {
	const previousState = {
		authors: [
			{
				name: 'author',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author2',
				id: '1c972c52-3198-4098-b6f7-799b45903199',
			},
			{
				name: 'author3',
				id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			},
			{
				name: 'author4',
				id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
			},
			{
				name: 'author5',
				id: '5e0b0f18-32c9-4933-b142-50459b47f09e',
			},
		],
	};

	const payload = {
		author: {
			name: 'newAuthor',
			id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36-new',
		},
	};

	expect(authorsReducer(previousState, addAuthor(payload))).toEqual({
		authors: [
			{
				name: 'author',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author2',
				id: '1c972c52-3198-4098-b6f7-799b45903199',
			},
			{
				name: 'author3',
				id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			},
			{
				name: 'author4',
				id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
			},
			{
				name: 'author5',
				id: '5e0b0f18-32c9-4933-b142-50459b47f09e',
			},
			{
				name: 'newAuthor',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36-new',
			},
		],
	});
});
