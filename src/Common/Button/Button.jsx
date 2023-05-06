import React from 'react';
import classes from './Button.module.css';

export const Button = ({ id, onClick, btnText, iconBtnClass }) => {
	return (
		<button
			className={`${classes.btn} ${classes[iconBtnClass]}`}
			id={id}
			onClick={onClick}
		>
			{btnText}
		</button>
	);
};
