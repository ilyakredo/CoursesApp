import React from 'react';
import { Button } from '../../../../Common/Button/Button';
import { BUTTON_TEXT_LOGOUT } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import classes from './Authorized.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../store/selectors';
import { logoutHandler } from '../../../../store/user/thunk';

export const Authorized = ({ setIsLogged }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const handleLogout = () => {
		dispatch(logoutHandler(navigate, setIsLogged, user));
	};

	return (
		<div className={classes.btnWrapper}>
			<Button onClick={handleLogout} btnText={BUTTON_TEXT_LOGOUT} />
		</div>
	);
};
