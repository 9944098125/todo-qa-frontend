export const formatDate = (dateInput: string) => {
	const date = new Date(dateInput);

	// Validate input
	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	// Define day suffixes
	const getDaySuffix = (day: number) => {
		if (day > 3 && day < 21) return "th";
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};

	// Format day, month, and year
	const day = date.getDate();
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	return `${day}${getDaySuffix(day)} ${month} ${year}`;
};
