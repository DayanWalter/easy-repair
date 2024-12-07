// Hilfsfunktion um den Montag (Start) der aktuellen Woche zu bekommen
export const getStartOfWeek = (date: Date) => {
	const newDate = new Date(date);
	// Setze Uhrzeit auf 00:00:00
	newDate.setHours(0, 0, 0, 0);

	// getDay() gibt 0 (Sonntag) bis 6 (Samstag) zurück
	const day = newDate.getDay();

	// Berechne die Differenz zum Montag
	// Wenn heute Sonntag (0) ist, gehen wir 6 Tage zurück
	// Sonst gehen wir (aktuellerTag - 1) Tage zurück
	const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);

	newDate.setDate(diff);
	return newDate;
};

// Hilfsfunktion um den Sonntag (Ende) der aktuellen Woche zu bekommen
export const getEndOfWeek = (date: Date) => {
	const newDate = new Date(date);
	// Setze Uhrzeit auf 23:59:59
	newDate.setHours(23, 59, 59, 999);

	const day = newDate.getDay();

	// Berechne die Differenz zum Sonntag
	const diff = newDate.getDate() + (7 - day);

	newDate.setDate(diff);
	return newDate;
};

// Funktion zur Berechnung der prozentualen Veränderung
export const calculatePercentageChange = (
	current: number,
	previous: number,
): number => {
	if (previous === 0) return 0;
	return ((current - previous) / previous) * 100;
};

// Add this interface at the top of the file
type Order = {
	date_start: string | Date;
	total_costs: number;
};

// Hauptfunktion zur Berechnung der Kosten
export const calculateCosts = (orders: Order[]) => {
	const now = new Date();

	// Diese Woche
	const thisWeekStart = getStartOfWeek(now);
	const thisWeekEnd = getEndOfWeek(now);

	// Letzte Woche
	const lastWeekStart = new Date(thisWeekStart);
	lastWeekStart.setDate(lastWeekStart.getDate() - 7);
	const lastWeekEnd = new Date(thisWeekEnd);
	lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

	// Letzter Monat
	const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

	const costs = {
		thisWeek: 0,
		lastWeek: 0,
		thisMonth: 0,
		lastMonth: 0,
		weeklyChange: 0,
		monthlyChange: 0,
	};

	for (const order of orders) {
		const orderDate = new Date(order.date_start);

		// Diese Woche
		if (orderDate >= thisWeekStart && orderDate <= thisWeekEnd) {
			costs.thisWeek += order.total_costs;
		}
		// Letzte Woche
		if (orderDate >= lastWeekStart && orderDate <= lastWeekEnd) {
			costs.lastWeek += order.total_costs;
		}
		// Dieser Monat
		if (
			orderDate.getFullYear() === now.getFullYear() &&
			orderDate.getMonth() === now.getMonth()
		) {
			costs.thisMonth += order.total_costs;
		}
		// Letzter Monat
		if (
			orderDate.getFullYear() === lastMonthStart.getFullYear() &&
			orderDate.getMonth() === lastMonthStart.getMonth()
		) {
			costs.lastMonth += order.total_costs;
		}
	}

	// Berechne prozentuale Veränderungen
	costs.weeklyChange = calculatePercentageChange(
		costs.thisWeek,
		costs.lastWeek,
	);
	costs.monthlyChange = calculatePercentageChange(
		costs.thisMonth,
		costs.lastMonth,
	);

	return costs;
};
