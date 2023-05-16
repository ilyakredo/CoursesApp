export const USER_INIT_STATE = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
		role: '',
	},
};

export const USER_PAYLOAD = {
	user: {
		name: 'Test name',
		email: 'Test email',
		token: 'Test token',
		role: 'admin',
	},
};

export const USER_STATE = {
	user: {
		isAuth: true,
		name: 'Test name',
		email: 'Test email',
		token: 'Test token',
		role: 'admin',
	},
};

export const COURSES_INIT_STATE = {
	courses: [],
};

export const COURSES_PAYLOAD = {
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

export const COURSES_STATE = {
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

export const COURSE_PAYLOAD = {
	course: {
		title: 'third course name',
		description: 'description for the third course',
		creationDate: '18/7/2020',
		duration: 80,
		authors: ['secondAuthorId', 'thirdAuthorId'],
		id: 'thirdCourseId',
	},
};

export const COURSES_ADDED_STATE = {
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

export const DELETE_COURSE_PAYLOAD = {
	id: 'thirdCourseId',
};

export const COURSE_UPDATE_PAYLOAD = {
	course: {
		title: 'third course name - updated',
		description: 'description for the third course - updated',
		creationDate: '22/2/2019',
		duration: 120,
		authors: ['secondAuthorId', 'thirdAuthorId'],
		id: 'thirdCourseId',
	},
};

export const UPDATED_COURSES_STATE = {
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
};

export const AUTHORS_INIT_STATE = {
	authors: [],
};

export const AUTHORS_PAYLOAD = {
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

export const AUTHORS_STATE = {
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

export const ADD_AUTHOR_PAYLOAD = {
	author: {
		name: 'newAuthor',
		id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36-new',
	},
};

export const ADDED_AUTHOR_STATE = {
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
};
