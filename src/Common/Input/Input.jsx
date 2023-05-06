import React from 'react';
import classes from './Input.module.css';

export const Input = ({
	label,
	onChange,
	placeholder,
	value,
	isRequired = false,
}) => {
	return (
		<label className={classes.inputLabel}>
			{label}
			<input
				onChange={onChange}
				className={classes.input}
				type='text'
				placeholder={placeholder}
				value={value}
				required={isRequired}
			></input>
		</label>
	);
};
