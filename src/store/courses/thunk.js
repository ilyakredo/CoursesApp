import {
	addCourse,
	deleteCourseAction,
	getCourses,
	updateCourseAction,
} from './actionCreators';

export const loadCourses = () => async (dispatch) => {
	const response = await fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		body: JSON.stringify(),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	if (result.successful) {
		const coursesPayload = {
			courses: result.result,
		};
		dispatch(getCourses(coursesPayload));
		return result.result;
	} else {
		return [];
	}
};

export const fetchCourseDelete = (action, token) => async (dispatch) => {
	const response = await fetch(
		`http://localhost:4000/courses/${action.payload.id}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		}
	);
	const result = await response.json();
	if (result.successful) {
		dispatch(deleteCourseAction({ id: action.payload.id }));
	}
};

export const fetchCourseUpdate = (payload, token) => async (dispatch) => {
	const response = await fetch(
		`http://localhost:4000/courses/${payload.course.id}`,
		{
			method: 'PUT',
			body: JSON.stringify(payload.course),
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		}
	);
	const result = await response.json();
	if (result.successful) {
		dispatch(updateCourseAction({ course: result.result }));
	}
};

export const fetchCourseAdd = (payload, token) => async (dispatch) => {
	const response = await fetch('http://localhost:4000/courses/add', {
		method: 'POST',
		body: JSON.stringify(payload.course),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	if (result.successful) {
		dispatch(addCourse({ course: result.result }));
	}
};
