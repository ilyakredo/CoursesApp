export const changeDateView = (date) => {
	const dateArr = date.split('/');
	const resArr = dateArr.reduce((prev, elem) => {
		if (elem.toString().length < 2) {
			return [...prev, '0' + elem];
		} else {
			return [...prev, elem];
		}
	}, []);
	return resArr.join('.');
};
