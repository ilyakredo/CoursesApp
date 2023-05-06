import React, { useEffect, useState } from 'react';
import { Button } from '../../Common/Button/Button';
import { Input } from '../../Common/Input/Input';
import classes from './CourseForm.module.css';
import {
	ALERT_MESSAGE_TEXT,
	EMPTY_AUTHORS_LIST_MESSAGE,
	BUTTON_TEXT_ADD_AUTHOR,
	BUTTON_TEXT_DELETE_AUTHOR,
	BUTTON_TEXT_CREATE_COURSE,
	LABEL_COURSE_TITLE,
	COURSE_TITLE_INPUT_PLACEHOLDER,
	LABEL_COURSE_DURATION,
	COURSE_DURATION_INPUT_PLACEHOLDER,
	BUTTON_TEXT_UPDATE_COURSE,
} from '../../constants';
import { convertDuration } from '../../helpers/pipeDuration';
import { mapAuthors } from '../../helpers/authorsRender';
import { NewAuthor } from './Components/NewAuthor/NewAuthor';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	authorsSelector,
	coursesSelctor,
	userSelector,
} from '../../store/selectors';
import { fetchCourseAdd, fetchCourseUpdate } from '../../store/courses/thunk';

export const CourseForm = () => {
	const authorsState = useSelector(authorsSelector);
	const [selectedAuthorsArray, setSelectedAuthorsArray] = useState([]);
	const [authorsList, setaAuthorsList] = useState(authorsState);
	const [listAuthors, setListAuthors] = useState(authorsList);
	const [newAuthorInput, setNewAuthorInput] = useState('');
	const [durationInput, setDurationInput] = useState('');
	const [newCourseTitle, setNewCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [duration, setDuration] = useState('00:00');
	const [isUpdateCourse, setIsUpdateCourse] = useState(false);
	const [isUpdateCourseValues, setIsUpdateCourseValues] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const courses = useSelector(coursesSelctor);
	const token = useSelector(userSelector).token;

	const handleCourseUpdate = () => {
		const updateCourse = courses.find(
			(course) => course.id === courseId.substring(1)
		);
		if (updateCourse) {
			setIsUpdateCourse(true);
			if (isUpdateCourseValues) {
				setCourseDescription(updateCourse.description);
				setNewCourseTitle(updateCourse.title);
				setDurationInput(updateCourse.duration);
				const selectAuthorsList = updateCourse.authors.reduce(
					(acc, currentValue) => {
						return [
							...acc,
							authorsState.filter((author) => author.id === currentValue)[0],
						];
					},
					[]
				);
				const authorsList = authorsState.filter(
					({ id }) => !updateCourse.authors.includes(id)
				);
				setSelectedAuthorsArray(selectAuthorsList);
				setListAuthors(authorsList);
				setDuration(convertDuration(durationInput));
				setIsUpdateCourseValues(false);
			}
		}
	};
	useEffect(() => {
		selectedAuthorsArray.forEach((selectedAuthor) => {
			setaAuthorsList((prev) =>
				prev.filter((author) => selectedAuthor === author)
			);
		});
	}, [selectedAuthorsArray]);

	useEffect(() => {
		setDuration(convertDuration(durationInput));
	}, [setDuration, durationInput]);

	useEffect(() => {
		if (courseId) {
			handleCourseUpdate();
		}
	});
	const removeAuthor = ({ target: { id: authorsId } }) => {
		const author = selectedAuthorsArray.find(({ id }) => id === authorsId);
		setListAuthors((prev) => {
			return [...prev, author];
		});
		const authorIndex = selectedAuthorsArray.indexOf(author);
		const selectedAuthors = selectedAuthorsArray;
		selectedAuthors.splice(authorIndex, 1);
		setSelectedAuthorsArray(selectedAuthors);
	};

	const addAuthor = ({ target: { id: authorsId } }) => {
		const author = listAuthors.find(({ id }) => id === authorsId);
		setSelectedAuthorsArray((prevState) => {
			return [...prevState, author];
		});
		const authorIndex = listAuthors.indexOf(author);
		const listOfAuthors = [...listAuthors];
		listOfAuthors.splice(authorIndex, 1);
		setListAuthors(listOfAuthors);
	};
	const authors = mapAuthors(listAuthors, addAuthor, BUTTON_TEXT_ADD_AUTHOR);

	const selectedAuthors = mapAuthors(
		selectedAuthorsArray,
		removeAuthor,
		BUTTON_TEXT_DELETE_AUTHOR
	);

	const createCourse = () => {
		const courseTitle = newCourseTitle;
		const description = courseDescription;
		const courseDuration = Number(durationInput);
		const currentDate = new Date().toLocaleDateString();
		const courseDate = currentDate.replaceAll('.', '/');
		if (
			courseTitle === '' ||
			description === '' ||
			courseDuration === '' ||
			selectedAuthorsArray.length === 0
		) {
			alert(ALERT_MESSAGE_TEXT);
			return;
		}
		const payload = {
			course: {
				id: courseId ? courseId.replace(':', '') : '',
				title: courseTitle,
				description: description,
				creationDate: courseDate,
				duration: courseDuration,
				authors: selectedAuthorsArray.map((author) => author.id),
			},
		};
		if (courseId) {
			dispatch(fetchCourseUpdate(payload, token));
		} else {
			dispatch(fetchCourseAdd(payload, token));
		}
		navigate('/courses');
	};

	const updateCourse = () => {
		createCourse();
	};

	const onChangeDuration = ({ target: { value } }) => {
		const inputMinutes = value.replace(/\D/g, '');
		setDurationInput(inputMinutes);
		const durationView = convertDuration(inputMinutes);
		setDuration(durationView);
		return durationView;
	};

	return (
		<section className={classes.coursesWrapper}>
			<div className={classes.titleWrapper}>
				<div className={classes.inputWrapper}>
					<Input
						onChange={({ target: { value } }) => {
							setNewCourseTitle(value);
						}}
						placeholder={COURSE_TITLE_INPUT_PLACEHOLDER}
						label={LABEL_COURSE_TITLE}
						value={newCourseTitle}
						required
					/>
				</div>
				<div className={classes.buttonWrapper}>
					<Button
						onClick={isUpdateCourse ? updateCourse : updateCourse}
						btnText={
							isUpdateCourse
								? BUTTON_TEXT_UPDATE_COURSE
								: BUTTON_TEXT_CREATE_COURSE
						}
					/>
				</div>
			</div>
			<div className={classes.descriptionWrapper}>
				<label>
					Description
					<textarea
						onChange={({ target: { value } }) => {
							setCourseDescription(value);
						}}
						minLength='2'
						className={classes.description}
						name='description'
						value={courseDescription}
						required='required'
					></textarea>
				</label>
			</div>
			<div className={classes.courseInfoWrapper}>
				<div className={classes.leftCol}>
					<NewAuthor
						setNewAuthorInput={setNewAuthorInput}
						newAuthorInput={newAuthorInput}
						setListAuthors={setListAuthors}
						listAuthors={listAuthors}
					/>
					<h3>Duration</h3>
					<div className={classes.authorInputWrapper}>
						<Input
							label={LABEL_COURSE_DURATION}
							placeholder={COURSE_DURATION_INPUT_PLACEHOLDER}
							onChange={onChangeDuration}
							value={durationInput}
						/>
					</div>
					<div className={classes.authorButtonWrapper}>
						<p>
							Duration: <span>{duration}</span> hours
						</p>
					</div>
				</div>
				<div className={classes.rightCol}>
					<h3>Authors</h3>
					<div className={classes.authorsListWrapper}>{authors}</div>
					<h3>Course authors</h3>
					<div className={classes.courseAuthors}>
						{selectedAuthors.length !== 0
							? selectedAuthors
							: EMPTY_AUTHORS_LIST_MESSAGE}
					</div>
				</div>
			</div>
		</section>
	);
};
