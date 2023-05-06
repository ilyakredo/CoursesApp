import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Authorized } from '../components/Authorized/Authorized';
import { NonAuthorized } from '../components/NonAuthorized/NonAuthorized';

const mockedState = {
	userReducer: {
		user: {
			isAuth: true,
			name: 'Test Name',
			email: '',
			token: '',
			role: 'admin',
		},
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
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('Checking whether Header component is rendered', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		</Provider>
	);
	const logo = screen.getByAltText(/Logo/i);
	expect(logo).toBeInTheDocument();
});

test('Checking if Authorized component is rendered', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Authorized />
			</BrowserRouter>
		</Provider>
	);
	const button = screen.getByText(/Logout/i);
	expect(button).toBeInTheDocument();
});

test('Checking if NonAuthorized component is rendered', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<NonAuthorized />
			</BrowserRouter>
		</Provider>
	);
	const button = screen.getByText(/Login/i);
	expect(button).toBeInTheDocument();
});
