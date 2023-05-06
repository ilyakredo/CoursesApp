import React from 'react';
import classes from './CourseCard.module.css';
import { convertDuration } from '../../../../helpers/pipeDuration';
import { changeDateView } from '../../../../helpers/dateGenerator';
import { getAuthorsList } from '../../../../helpers/authorsRender';
import { useSelector } from 'react-redux';
import { authorsSelector, userRoleSelector } from '../../../../store/selectors';
import { AdminFunctionality } from './AdminFunctionality/AdminFunctionality';
import { UserFunctionality } from './UserFunctionality/UserFunctionality';

export const CourseCard = ({ course, removeCourse, updateCourse }) => {
	const authorsState = useSelector(authorsSelector);
	const userRole = useSelector(userRoleSelector);

	return (
		<article className={classes.courseCardWrapper}>
			<div className={classes.leftColumnWrapper}>
				<div className={classes.courseName}>
					<h2>{course.title}</h2>
				</div>
				<div className={classes.courseDescription}>{course.description}</div>
			</div>
			<div className={classes.rightColumnWrapper}>
				<div className={classes.courseAuthor}>
					<span className={classes.descLabel}>Authors: </span>
					{getAuthorsList(course, authorsState)}
				</div>
				<div className={classes.courseDuration}>
					<span className={classes.descLabel}>Duration: </span>
					{convertDuration(course.duration)}
					<span> hours</span>
				</div>
				<div className={classes.courseDate}>
					<span className={classes.descLabel}>Created: </span>
					{changeDateView(course.creationDate)}
				</div>
				{userRole === 'admin' ? (
					<AdminFunctionality
						course={course}
						removeCourse={removeCourse}
						updateCourse={updateCourse}
					/>
				) : (
					<UserFunctionality course={course} />
				)}
			</div>
		</article>
	);
};
