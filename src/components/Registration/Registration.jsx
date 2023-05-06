import React, { useEffect, useState } from 'react';
import { Button } from '../../Common/Button/Button';
import { Input } from '../../Common/Input/Input';
import classes from '../Login/LoginRegister.module.css';
import {
	BUTTON_TEXT_REG_SUBMIT,
	LABEL_EMAIL,
	LABEL_NAME,
	LABEL_PASS,
	REG_EXIST_ACCOUNT_MSG,
	USER_EMAIL_INPUT_PLACEHOLDER,
	USER_NAME_INPUT_PLACEHOLDER,
	USER_PASS_INPUT_PLACEHOLDER,
} from '../../constants';
import { Link, useNavigate } from 'react-router-dom';

export const Registration = () => {
	const [user, setUser] = useState('');
	const [nameInput, setNameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passInput, setPassInput] = useState('');
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState('');

	const register = async (newUser) => {
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (result.successful) {
			navigate('/login');
		} else {
			setUser('');
			setErrorMsg(result.errors.toString());
		}
	};

	const handleRegister = (event) => {
		event.preventDefault();
		if (nameInput && emailInput && passInput) {
			setUser({ name: nameInput, password: passInput, email: emailInput });
		}
	};

	useEffect(() => {
		if (user) {
			register(user);
		}
	});
	return (
		<main className={classes.sectionWrapper}>
			<section className={classes.innerWrapper}>
				<h2>Registration</h2>
				{errorMsg}
				<form className={classes.form} onSubmit={handleRegister}>
					<Input
						onChange={({ target: { value } }) => {
							setNameInput(value);
						}}
						label={LABEL_NAME}
						placeholder={USER_NAME_INPUT_PLACEHOLDER}
						value={nameInput}
					/>
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
						value={passInput}
					/>
					<Button btnType={'submit'} btnText={BUTTON_TEXT_REG_SUBMIT} />
					<p>
						{REG_EXIST_ACCOUNT_MSG}
						<Link to='/login'>Login</Link>
					</p>
				</form>
			</section>
		</main>
	);
};
