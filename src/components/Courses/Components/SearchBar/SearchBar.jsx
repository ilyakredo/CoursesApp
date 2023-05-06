import React from 'react';
import { Button } from '../../../../Common/Button/Button';
import { Input } from '../../../../Common/Input/Input';
import {
	BUTTON_TEXT_SEARCH_COURSE,
	SEARCH_INPUT_PLACEHOLDER,
} from '../../../../constants';
import classes from './SearchBar.module.css';

export const SearchBar = ({ searchCourses, onChange }) => {
	return (
		<div className={classes.searchWrapper}>
			<div className={classes.inputWrapper}>
				<Input onChange={onChange} placeholder={SEARCH_INPUT_PLACEHOLDER} />
			</div>
			<div className={classes.buttonWrapper}>
				<Button onClick={searchCourses} btnText={BUTTON_TEXT_SEARCH_COURSE} />
			</div>
		</div>
	);
};
