import React from 'react';
import { LOGO_ALT, LOGO_SRC } from '../../../../constants';
import classes from './Logo.module.css';

export const Logo = () => {
	return <img className={classes.logo} src={LOGO_SRC} alt={LOGO_ALT} />;
};
