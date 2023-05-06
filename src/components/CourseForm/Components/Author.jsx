import React from 'react';
import { Button } from '../../../Common/Button/Button';
import classes from './Author.module.css';

export const Author = ({ onClick, btnId, btnText, name }) => {
	return (
		<div className={classes.authorItem}>
			<div className={classes.authorName}>{name}</div>
			<Button onClick={onClick} id={btnId} btnText={btnText} />
		</div>
	);
};
