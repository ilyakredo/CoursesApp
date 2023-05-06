import React from 'react';
import { Button } from '../../../../Common/Button/Button';
import { BUTTON_TEXT_LOG, BUTTON_TEXT_REG } from '../../../../constants';
import { Link } from 'react-router-dom';
import classes from './NonAuthorized.module.css';

export const NonAuthorized = () => {
	return (
		<div className={classes.btnWrapper}>
			<Link to='/login'>
				<Button onClick={() => {}} btnText={BUTTON_TEXT_LOG} />
			</Link>
			<Link to='/registration'>
				<Button onClick={() => {}} btnText={BUTTON_TEXT_REG} />
			</Link>
		</div>
	);
};
