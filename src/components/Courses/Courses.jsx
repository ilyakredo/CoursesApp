import React, { useState } from 'react';
import classes from './Courses.module.css';
import { CourseCard } from './Components/CourseCard/CourseCard';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { Button } from '../../Common/Button/Button';
import { BUTTON_TEXT_ADD_COURSE } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	authorsSelector,
	coursesSelctor,
	userSelector,
} from '../../store/selectors';
import { deleteCourseAction } from '../../store/courses/actionCreators';
import { userRoleSelector } from '../../store/selectors';
import { fetchCourseDelete } from '../../store/courses/thunk';

export const Courses = () => {
	const coursesState = useSelector(coursesSelctor);
	const authorsState = useSelector(authorsSelector);
	const [filteredCourses, setFilteredCourses] = useState('');
	const [searchInputVal, setSearchInputVal] = useState('');
	const dispatch = useDispatch();
	const userRole = useSelector(userRoleSelector);
	const user = useSelector(userSelector);
	const navigate = useNavigate();

	const removeCourse = (courseId) => {
		const payload = {
			id: courseId,
		};
		dispatch(fetchCourseDelete(deleteCourseAction(payload), user.token));
	};

	const updateCourse = (courseId) => {
		navigate(`/courses/update/:${courseId}`);
	};

	const coursesList = coursesState.map((course) => {
		return (
			<CourseCard
				removeCourse={removeCourse}
				updateCourse={updateCourse}
				key={course.id}
				course={course}
				authors={authorsState}
			/>
		);
	});

	const searchCourses = () => {
		const filteredCourses = coursesState.filter(
			(course) =>
				course.id.includes(searchInputVal) ||
				course.title.toLowerCase().includes(searchInputVal)
		);
		setFilteredCourses(
			filteredCourses.map((course) => {
				return (
					<CourseCard key={course.id} course={course} authors={authorsState} />
				);
			})
		);
	};

	const onChange = ({ target: { value } }) => {
		setSearchInputVal(value);
		if (value === '') {
			setFilteredCourses('');
		}
	};

	const handleAdminRole = (userRole) => {
		if (userRole === 'admin') {
			return (
				<Link to='/courses/add'>
					<Button btnText={BUTTON_TEXT_ADD_COURSE} />
				</Link>
			);
		}
	};

	return (
		<section className={classes.coursesWrapper}>
			<section className={classes.handleWrapper}>
				<div className={classes.searchWrapper}>
					<SearchBar onChange={onChange} searchCourses={searchCourses} />
				</div>
				<div className={classes.addCourseWrapper}>
					{handleAdminRole(userRole)}
				</div>
			</section>
			<section className={classes.coursesListWrapper}>
				{filteredCourses ? filteredCourses : coursesList}
			</section>
		</section>
	);
};
