export const convertDuration = (durationMinutes) => {
	let hours = Math.trunc(durationMinutes / 60);
	let minutes = durationMinutes % 60;
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	return `${hours}:${minutes}`;
};
