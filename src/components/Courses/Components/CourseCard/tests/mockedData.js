const mockedState = {
	userReducer: {
		user: {
			isAuth: true,
			name: 'Test Name',
			email: '',
			token: '',
			role: '',
		},
	},

	authorsReducer: {
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
		],
	},
	coursesReducer: {
		courses: [
			{
				title: 'first course name',
				description: 'description for the first course',
				creationDate: '9/3/2021',
				duration: 30,
				authors: [
					'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
					'1c972c52-3198-4098-b6f7-799b45903199',
				],
				id: 'firstCourseId',
			},
		],
	},
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
