import React from 'react';
import { useSelector } from 'react-redux';
import { userRoleSelector } from '../../store/selectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
	const userRole = useSelector(userRoleSelector);
	if (userRole === 'admin') {
		return children;
	} else {
		return <Navigate to={'/courses'} />;
	}
};
