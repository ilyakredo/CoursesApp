import React from 'react';
import classes from './CourseInfo.module.css';
import { Link } from 'react-router-dom';
import { convertDuration } from '../../helpers/pipeDuration';
import { changeDateView } from '../../helpers/dateGenerator';
import AuthorItem from './components/AuthorItem';
import { useSelector } from 'react-redux';
import { authorsSelector } from '../../store/selectors';

export const CourseInfo = ({ course }) => {
	const authorsState = useSelector(authorsSelector);
	const getAuthorName = (id) => {
		return authorsState.find((author) => author.id === id);
	};

	return (
		<main className={classes.contentWrapper}>
			<section className={classes.linkWrapper}>
				<Link className={classes.coursesLink} to='/courses'>
					{' '}
					{'<'} Back to courses
				</Link>
			</section>
			<section className={classes.courseInfoWrapper}>
				<h2>{course.title}</h2>
				<section className={classes.courseInfoDescription}>
					<article className={classes.leftColumnWrapper}>
						<p>{course.description}</p>
					</article>
					<article className={classes.rightColumnWrapper}>
						<div className={classes.rightColInnerWrapper}>
							<div className={classes.courseInfo}>
								<p>
									<span className={classes.descLabel}>ID: </span>
									{course.id}
								</p>
							</div>
							<div className={classes.courseInfo}>
								<p>
									<span className={classes.descLabel}>Duration: </span>
									{convertDuration(course.duration)}
									<span> hours</span>
								</p>
							</div>
							<div className={classes.courseInfo}>
								<p>
									<span className={classes.descLabel}>Created: </span>
									{changeDateView(course.creationDate)}
								</p>
							</div>
							<div className={classes.courseInfo}>
								<p>
									<span className={classes.descLabel}>Authors:</span>
								</p>
								<ul className={classes.authorsList}>
									{course.authors.map((authorsId) => {
										return (
											<AuthorItem
												key={authorsId}
												authorName={getAuthorName(authorsId).name}
											/>
										);
									})}
								</ul>
							</div>
						</div>
					</article>
				</section>
			</section>
		</main>
	);
};
