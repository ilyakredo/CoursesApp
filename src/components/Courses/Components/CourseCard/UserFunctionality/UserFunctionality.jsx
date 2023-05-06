import React from 'react';
import { Button } from '../../../../../Common/Button/Button';
import { Link } from 'react-router-dom';
import classes from '../CourseCard.module.css';
import { BUTTON_TEXT_SHOW_COURSE } from '../../../../../constants';

export const UserFunctionality = ({ course }) => {
	return (
		<div className={classes.buttonsWrapper}>
			<div className={classes.buttonWrapper}>
				<Link to={`/courses/:${course.id}`}>
					<Button
						id={course.id}
						className={classes.showCourseBtn}
						btnText={BUTTON_TEXT_SHOW_COURSE}
					/>
				</Link>
			</div>
		</div>
	);
};
