import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CourseForm } from '../CourseForm';
import {
	COURSE_DURATION_INPUT_PLACEHOLDER,
	COURSE_TITLE_INPUT_PLACEHOLDER,
} from '../../../constants';

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
				name: 'author#',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author#2',
				id: '1c972c52-3198-4098-b6f7-799b45903199',
			},
			{
				name: 'author#3',
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

test('Checking if CourseForm component is rendered', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);
	const courseFormDescription = screen.getByLabelText('Description');
	expect(courseFormDescription).toBeInTheDocument();
});

test('Checking if all authors are rendered', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);
	const authorsButtons = screen.getAllByText(/author#/i);
	expect(authorsButtons).toHaveLength(3);
});

test('Should be able to type in course title input', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);
	const courseTitleInput = screen.getByPlaceholderText(
		COURSE_TITLE_INPUT_PLACEHOLDER
	);
	fireEvent.change(courseTitleInput, { target: { value: 'New test course' } });
	expect(courseTitleInput.value).toBe('New test course');
});

test('Checking if the course duration correctly converted into houres', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);
	const courseDurationInput = screen.getByPlaceholderText(
		COURSE_DURATION_INPUT_PLACEHOLDER
	);
	const courseDurationSpan = screen.getByText('00:00');
	fireEvent.change(courseDurationInput, { target: { value: '60' } });
	expect(courseDurationSpan).toContainHTML('01:00');
});

test('Checking if the author is correctly adding to the course by pressing a button', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);
	const addAuthorList = screen.getAllByText('Add author');
	fireEvent.click(addAuthorList[1]);
	const removeAuthorBtn = screen.getByText('Delete author');
	expect(removeAuthorBtn).toBeInTheDocument();
});

beforeEach(() => {
	fetch.resetMocks();
});

test('Checking if fetched authors appear', async () => {
	fetch.mockResponseOnce(
		JSON.stringify({
			successful: true,
			result: [
				{
					name: 'author#',
					id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
				},
				{
					name: 'author#2',
					id: '1c972c52-3198-4098-b6f7-799b45903199',
				},
				{
					name: 'author#3',
					id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
				},
				{
					name: 'author#4',
					id: '072fe3fc-e751-4745-9af5-aa9eed0ea900',
				},
				{
					name: 'author#5',
					id: '072fe3fc-e751-4745-9af5-aa9eed0ea901',
				},
			],
		})
	);
	const fetchAuthors = async () => {
		try {
			const result = await fetch('http://localhost:4000/authors/all');
			const data = await result.json();
			return data.result;
		} catch (err) {
			return null;
		}
	};
	mockedStore.getState().authorsReducer.authors = await fetchAuthors();
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);
	const authorsQtt = screen.getAllByText(/#/i);
	expect(authorsQtt).toHaveLength(5);
});
