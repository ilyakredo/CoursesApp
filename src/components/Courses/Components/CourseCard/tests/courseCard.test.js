import { screen, render, fireEvent } from '@testing-library/react';
import { CourseCard } from '../CourseCard';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminFunctionality } from '../AdminFunctionality/AdminFunctionality';
import { UserFunctionality } from '../UserFunctionality/UserFunctionality';
import { CourseInfo } from '../../../../CourseInfo/CourseInfo';

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

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('Checking if CourseCard component rendered - title check', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard course={mockedStore.getState().coursesReducer.courses[0]} />
			</BrowserRouter>
		</Provider>
	);
	const courseHeading = screen.getByText(/first course name/i);
	expect(courseHeading).toBeInTheDocument();
});

test('Checking if CourseCard component rendered - button check', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseCard course={mockedStore.getState().coursesReducer.courses[0]} />
			</BrowserRouter>
		</Provider>
	);
	const courseCardBtn = screen.getByRole('button');
	expect(courseCardBtn).toBeInTheDocument();
});

test('Checking if AdminFunctionality component has 3 buttons', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<AdminFunctionality
					course={mockedStore.getState().coursesReducer.courses[0]}
				/>
			</BrowserRouter>
		</Provider>
	);
	const adminFuncButtons = screen.getAllByRole('button');
	expect(adminFuncButtons).toHaveLength(3);
});

test('Checking if UserFunctionality component has 3 buttons', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<UserFunctionality
					course={mockedStore.getState().coursesReducer.courses[0]}
				/>
			</BrowserRouter>
		</Provider>
	);
	const userFuncButtons = screen.getAllByRole('button');
	expect(userFuncButtons).toHaveLength(1);
});

test('Cheking if course info opens', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route
						path='/courses/:firstCourseId'
						element={
							<CourseInfo
								course={mockedStore.getState().coursesReducer.courses[0]}
							/>
						}
					/>
					<Route path='/' element={<div></div>} />
				</Routes>
				<UserFunctionality
					course={mockedStore.getState().coursesReducer.courses[0]}
				/>
			</BrowserRouter>
		</Provider>
	);
	const courseInfoBtn = screen.getByText(/Show course/i);
	fireEvent.click(courseInfoBtn);
	const prevPageLink = screen.getByText(/Back to courses/i);
	expect(prevPageLink).toBeInTheDocument();
});

// test('Checking course delete', () => {
// 	const payload = {
// 		id: 'firstCourseId',
// 	};
// 	console.log(mockedStore.getState().coursesReducer.courses);
// 	render(
// 		<Provider store={mockedStore}>
// 			<BrowserRouter>
// 				<AdminFunctionality
// 					course={mockedStore.getState().coursesReducer.courses[0]}
// 					removeCourse={() => {
// 						coursesReducer(
// 							mockedStore.getState().coursesReducer,
// 							deleteCourseAction(payload)
// 						);
// 						console.log('--33-->', mockedStore.getState().coursesReducer);
// 					}}
// 				/>
// 			</BrowserRouter>
// 		</Provider>
// 	);
// 	const courseDeleteBtn = screen.getAllByRole('button')[2];
// 	fireEvent.click(courseDeleteBtn);
// 	console.log('--2-->', mockedStore.getState().coursesReducer.courses);
// 	expect(mockedStore.getState().coursesReducer.courses[0]).toBeNull();
// });
