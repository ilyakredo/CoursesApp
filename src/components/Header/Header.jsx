import React from 'react';
import { Logo } from './components/Logo/Logo';
import classes from './Header.module.css';
import { NonAuthorized } from './components/NonAuthorized/NonAuthorized.jsx';
import { Authorized } from './components/Authorized/Authorized';
import { userSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';

export const Header = ({ isLogged, setIsLogged }) => {
	const userState = useSelector(userSelector);
	return (
		<header className={classes.headerWrapper}>
			<div className={classes.logoWrapper}>
				<Logo />
			</div>
			<div className={classes.controlPanelWrapper}>
				<div className={classes.userWrapper}>
					<p>{userState.name}</p>
				</div>
				<div className={classes.btnWrapper}>
					{isLogged ? (
						<Authorized setIsLogged={setIsLogged} />
					) : (
						<NonAuthorized />
					)}
				</div>
			</div>
		</header>
	);
};
