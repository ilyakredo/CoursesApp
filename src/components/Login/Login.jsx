import React, { useState } from 'react';
import { Button } from '../../Common/Button/Button';
import { Input } from '../../Common/Input/Input';
import classes from './LoginRegister.module.css';
import {
	BUTTON_TEXT_LOG,
	LABEL_EMAIL,
	LABEL_PASS,
	LOG_REG_ACCOUNT_MSG,
	USER_EMAIL_INPUT_PLACEHOLDER,
	USER_PASS_INPUT_PLACEHOLDER,
} from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authorized } from '../../store/user/thunk';

export const Login = ({ setIsLogged }) => {
	const [emailInput, setEmailInput] = useState('');
	const [passInput, setPassInput] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = (event) => {
		event.preventDefault();
		if (emailInput && passInput) {
			dispatch(authorized({ email: emailInput, password: passInput })).then(
				(result) => {
					if (result.successful) {
						setEmailInput('');
						setPassInput('');
						setIsLogged(true);
						navigate('/courses');
					} else {
						result.errors
							? setErrorMsg(result.errors.toString())
							: setErrorMsg(result.result.toString());
					}
				}
			);
		}
	};

	return (
		<div className={classes.sectionWrapper}>
			<section className={classes.innerWrapper}>
				<h2>Login</h2>
				{errorMsg}
				<form className={classes.form} onSubmit={handleLogin}>
					<Input
						onChange={({ target: { value } }) => {
							setEmailInput(value);
						}}
						label={LABEL_EMAIL}
						placeholder={USER_EMAIL_INPUT_PLACEHOLDER}
						value={emailInput}
					/>
					<Input
						onChange={({ target: { value } }) => {
							setPassInput(value);
						}}
						label={LABEL_PASS}
						placeholder={USER_PASS_INPUT_PLACEHOLDER}
					/>
					<Button btnText={BUTTON_TEXT_LOG} />
					<p>
						{LOG_REG_ACCOUNT_MSG}
						<Link to='/registration'>Register</Link>
					</p>
				</form>
			</section>
		</div>
	);
};
