import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CourseForm } from '../CourseForm';
import {
	COURSE_DURATION_INPUT_PLACEHOLDER,
	COURSE_TITLE_INPUT_PLACEHOLDER,
} from '../../../constants';
import { mockedStore } from './mockedData';

const createMarkup = (props) => (
	<Provider store={mockedStore}>
		<BrowserRouter>
			<CourseForm {...props} />
		</BrowserRouter>
	</Provider>
);

const createTree = (props) => render(createMarkup(props));

test('Should check if CourseForm component is rendered', () => {
	createTree();
	const courseFormDescription = screen.getByLabelText('Description');
	expect(courseFormDescription).toBeInTheDocument();
});

test('Should check if all authors are rendered', () => {
	createTree();
	const authorsButtons = screen.getAllByText(/author#/i);
	expect(authorsButtons).toHaveLength(3);
});

test('Should be able to type in course title input', () => {
	createTree();
	const courseTitleInput = screen.getByPlaceholderText(
		COURSE_TITLE_INPUT_PLACEHOLDER
	);
	fireEvent.change(courseTitleInput, { target: { value: 'New test course' } });
	expect(courseTitleInput.value).toBe('New test course');
});

test('Should check if the course duration correctly converted into houres', () => {
	createTree();
	const courseDurationInput = screen.getByPlaceholderText(
		COURSE_DURATION_INPUT_PLACEHOLDER
	);
	const courseDurationSpan = screen.getByText('00:00');
	fireEvent.change(courseDurationInput, { target: { value: '60' } });
	expect(courseDurationSpan).toContainHTML('01:00');
});

test('Should check if the author is correctly adding to the course by pressing a button', () => {
	createTree();
	const addAuthorList = screen.getAllByText('Add author');
	fireEvent.click(addAuthorList[1]);
	const removeAuthorBtn = screen.getByText('Delete author');
	expect(removeAuthorBtn).toBeInTheDocument();
});

beforeEach(() => {
	fetch.resetMocks();
});

test('Should check if fetched authors appear', async () => {
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
	createTree();
	const authorsQtt = screen.getAllByText(/#/i);
	expect(authorsQtt).toHaveLength(5);
});
