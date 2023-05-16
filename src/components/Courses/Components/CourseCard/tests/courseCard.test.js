import { screen, render, fireEvent } from '@testing-library/react';
import { CourseCard } from '../CourseCard';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminFunctionality } from '../AdminFunctionality/AdminFunctionality';
import { UserFunctionality } from '../UserFunctionality/UserFunctionality';
import { CourseInfo } from '../../../../CourseInfo/CourseInfo';
import { mockedStore } from './mockedData';

const createMarkup = (props) => (
	<Provider store={mockedStore}>
		<BrowserRouter>
			<CourseCard {...props} />
		</BrowserRouter>
	</Provider>
);

const createTree = (props) => render(createMarkup(props));

test('Should check if CourseCard component rendered - title check', () => {
	createTree({ course: mockedStore.getState().coursesReducer.courses[0] });
	const courseHeading = screen.getByText(/first course name/i);
	expect(courseHeading).toBeInTheDocument();
});

test('Should check if CourseCard component rendered - button check', () => {
	createTree({ course: mockedStore.getState().coursesReducer.courses[0] });
	const courseCardBtn = screen.getByRole('button');
	expect(courseCardBtn).toBeInTheDocument();
});

test('Should check if AdminFunctionality component has 3 buttons', () => {
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

test('Should check if UserFunctionality component has 3 buttons', () => {
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

test('Should check if course info opens', () => {
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
