import { Author } from '../components/CourseForm/Components/Author';

export const mapAuthors = (authors, handleFunction, btnText) => {
	return authors.map(({ id, name }) => (
		<Author
			key={id}
			name={name}
			onClick={handleFunction}
			btnId={id}
			btnText={btnText}
		/>
	));
};
export const getAuthorsList = (course, authorsState) => {
	return course.authors
		.map((authorId) => {
			return authorsState.find((author) => author.id === authorId).name;
		})
		.join(', ');
};
