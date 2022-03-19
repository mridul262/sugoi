export const dateConvertor = (date: string) => {
	try {
		const formater = new Intl.DateTimeFormat('en-US', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
		const d = new Date(date);
		const formattedDate = formater.format(d);
		return formattedDate;
	} catch (err) {
		return '-';
	}
};
