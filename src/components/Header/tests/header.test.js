import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Authorized } from '../components/Authorized/Authorized';
import { NonAuthorized } from '../components/NonAuthorized/NonAuthorized';
import { mockedStore } from './mockedData';

const createMarkup = (component) => (
	<Provider store={mockedStore}>
		<BrowserRouter>{component}</BrowserRouter>
	</Provider>
);

const renderTree = (component) => render(createMarkup(component));

test('Should check whether Header component is rendered', () => {
	renderTree(<Header />);
	const logo = screen.getByAltText(/Logo/i);
	expect(logo).toBeInTheDocument();
});

test('Should check if Authorized component is rendered', () => {
	renderTree(<Authorized />);
	const button = screen.getByText(/Logout/i);
	expect(button).toBeInTheDocument();
});

test('Should check if NonAuthorized component is rendered', () => {
	renderTree(<NonAuthorized />);
	const button = screen.getByText(/Login/i);
	expect(button).toBeInTheDocument();
});
