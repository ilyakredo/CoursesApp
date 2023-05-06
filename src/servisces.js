export const loadCourses = async () => {
	const token = localStorage.getItem('token');
	const response = await fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		body: JSON.stringify(),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	const result = await response.json();
	if (result.successful) {
		return result.result;
	} else {
		return [];
	}
};

export const loadAuthors = async () => {
	const token = localStorage.getItem('token');
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		body: JSON.stringify(),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	const result = await response.json();
	if (result.successful) {
		return result.result;
	} else {
		return [];
	}
};
