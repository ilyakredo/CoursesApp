import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Courses } from '../Courses';

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
					'1c972c52-3198-4098-b6f7-799b45903199',
					'072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
				],
				id: 'firstCourseId',
			},
			{
				title: 'second course name',
				description: 'description for the second course',
				creationDate: '9/3/2022',
				duration: 50,
				authors: [
					'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
					'072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
				],
				id: 'secondCourseId',
			},
		],
	},
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('Checking if Courses component is rendered', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
	const searchInput = screen.getByPlaceholderText('Enter course name...');
	expect(searchInput).toBeInTheDocument();
});

test('Checking if both courses titles are rendered', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
	const coursesTitles = screen.getAllByText(/course name/i);
	expect(coursesTitles).toHaveLength(2);
});

beforeEach(() => {
	fetch.resetMocks();
});

test('Checking if fetched courses displayed', async () => {
	fetch.mockResponseOnce(
		JSON.stringify({
			successful: true,
			result: [
				{
					title: 'title',
					description: 'description',
					creationDate: '9/3/2021',
					duration: 30,
					authors: [
						'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
						'1c972c52-3198-4098-b6f7-799b45903199',
						'072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
					],
					id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
				},
				{
					title: 'Linux',
					description: 'TEST desc',
					duration: 787,
					authors: [
						'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
						'1c972c52-3198-4098-b6f7-799b45903199',
					],
					creationDate: '27/04/2023',
					id: 'b332e55c-f9a3-4116-adcf-2f4ed543a166',
				},
				{
					title: '.NET',
					description:
						"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					duration: 280,
					authors: [
						'1c972c52-3198-4098-b6f7-799b45903199',
						'072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
						'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
					],
					creationDate: '27/04/2023',
					id: 'e33bf7a9-dca9-4c7d-9f40-df9e3df6d509',
				},
			],
		})
	);

	const fetchCourses = async () => {
		try {
			const result = await fetch('http://localhost:4000/courses/all');
			const data = await result.json();
			return data.result;
		} catch (err) {
			return null;
		}
	};

	mockedStore.getState().coursesReducer.courses = await fetchCourses();

	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
	const fetchedCourseDesc = await screen.findByText(/TEST desc/i);
	expect(fetchedCourseDesc).toBeInTheDocument();
});
