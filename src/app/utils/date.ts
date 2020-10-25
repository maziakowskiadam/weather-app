export const secondsToDate = (date: number): Date => {
	const milisPerSecond = 1000;
	return new Date(date * milisPerSecond);
};
