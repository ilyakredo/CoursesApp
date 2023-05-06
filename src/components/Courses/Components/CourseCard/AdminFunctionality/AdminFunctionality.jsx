import React from 'react';
import { Button } from '../../../../../Common/Button/Button';
import classes from '../CourseCard.module.css';
import { Link } from 'react-router-dom';
import {
	BUTTON_TEXT_SHOW_COURSE,
	DELETE_ICON,
	EDIT_ICON,
	ICON_BTN_CLASS,
} from '../../../../../constants';

export const AdminFunctionality = ({ course, removeCourse, updateCourse }) => {
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
			<div className={classes.buttonWrapper}>
				<Button
					iconBtnClass={ICON_BTN_CLASS}
					btnText={EDIT_ICON}
					onClick={() => updateCourse(course.id)}
				/>
			</div>
			<div className={classes.buttonWrapper}>
				<Button
					id={course.id}
					onClick={() => removeCourse(course.id)}
					iconBtnClass={ICON_BTN_CLASS}
					btnText={DELETE_ICON}
				/>
			</div>
		</div>
	);
};
