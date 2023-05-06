import React from 'react';
import { Button } from '../../../../Common/Button/Button';
import { Input } from '../../../../Common/Input/Input';
import classes from './NewAuthor.module.css';
import {
	AUTHOR_NAME_INPUT_PLACEHOLDER,
	BUTTON_TEXT_CREATE_AUTHOR,
	LABEL_AUTHOR_NAME,
} from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateAuthor } from '../../../../store/authors/thunk';
import { authorsSelector, userSelector } from '../../../../store/selectors';

export const NewAuthor = ({
	newAuthorInput,
	setNewAuthorInput,
	setListAuthors,
}) => {
	const dispatch = useDispatch();
	const { token } = useSelector(userSelector);
	const authors = useSelector(authorsSelector);

	const createAuthor = () => {
		if (newAuthorInput) {
			const newAuthor = { name: newAuthorInput };
			const payload = {
				author: newAuthor,
			};
			dispatch(fetchCreateAuthor(payload, token)).then((res) => {
				setListAuthors([...authors, res]);
			});
			setNewAuthorInput('');
		}
	};

	return (
		<div>
			<h3>Add author</h3>
			<div className={classes.authorInputWrapper}>
				<Input
					onChange={({ target: { value } }) => {
						setNewAuthorInput(value);
					}}
					label={LABEL_AUTHOR_NAME}
					placeholder={AUTHOR_NAME_INPUT_PLACEHOLDER}
					value={newAuthorInput}
				/>
			</div>
			<div className={classes.authorButtonWrapper}>
				<Button onClick={createAuthor} btnText={BUTTON_TEXT_CREATE_AUTHOR} />
			</div>
		</div>
	);
};
