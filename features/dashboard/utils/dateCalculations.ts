import type { CostMetrics, OrderCosts } from "../dashboard.types";

// ===== Date Helper Functions =====

/**
 * Gets the Monday (start) of the current week
 * @param date Input date
 * @returns Date object set to Monday 00:00:00
 */
export const getStartOfWeek = (date: Date): Date => {
	const newDate = new Date(date);
	// Set the time to 00:00:00
	newDate.setHours(0, 0, 0, 0);

	// getDay() returns 0 (Sunday) to 6 (Saturday)
	const day = newDate.getDay();

	// Calculate the difference to Monday
	// If today is Sunday (0), go back 6 days
	// Otherwise go back (current day - 1) days
	const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);

	newDate.setDate(diff);
	return newDate;
};

/**
 * Gets the Sunday (end) of the current week
 * @param date Input date
 * @returns Date object set to Sunday 23:59:59
 */
export const getEndOfWeek = (date: Date): Date => {
	const newDate = new Date(date);
	// Set the time to 23:59:59
	newDate.setHours(23, 59, 59, 999);

	const day = newDate.getDay();

	// Calculate the difference to Sunday
	const diff = newDate.getDate() + (7 - day);

	newDate.setDate(diff);
	return newDate;
};

// ===== Calculation Helper Functions =====

/**
 * Calculates the percentage change between two numbers
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change
 */
export const calculatePercentageChange = (
	current: number,
	previous: number,
): number => {
	if (previous === 0) return 0;
	return ((current - previous) / previous) * 100;
};

// ===== Main Cost Calculation Function =====

/**
 * Calculates various cost metrics for different time periods
 * @param orders Array of orders with costs
 * @returns Object containing cost metrics for different periods
 */
export const calculateCosts = (orders: OrderCosts[]): CostMetrics => {
	const now = new Date();

	// Initialize time periods
	const thisWeekStart = getStartOfWeek(now);
	const thisWeekEnd = getEndOfWeek(now);

	const lastWeekStart = new Date(thisWeekStart);
	lastWeekStart.setDate(lastWeekStart.getDate() - 7);
	const lastWeekEnd = new Date(thisWeekEnd);
	lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

	const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	const thisYearStart = new Date(now.getFullYear(), 0, 1);

	// Initialize costs object
	const costs = {
		thisWeek: 0,
		lastWeek: 0,
		thisMonth: 0,
		lastMonth: 0,
		thisYear: 0,
		weeklyChange: 0,
		monthlyChange: 0,
	};

	// Calculate costs for each period
	for (const order of orders) {
		const orderDate = new Date(order.date_start ?? "");

		// This week
		if (orderDate >= thisWeekStart && orderDate <= thisWeekEnd) {
			costs.thisWeek += order.total_costs ?? 0;
		}
		// Last week
		if (orderDate >= lastWeekStart && orderDate <= lastWeekEnd) {
			costs.lastWeek += order.total_costs ?? 0;
		}
		// This month
		if (
			orderDate.getFullYear() === now.getFullYear() &&
			orderDate.getMonth() === now.getMonth()
		) {
			costs.thisMonth += order.total_costs ?? 0;
		}
		// Last month
		if (
			orderDate.getFullYear() === lastMonthStart.getFullYear() &&
			orderDate.getMonth() === lastMonthStart.getMonth()
		) {
			costs.lastMonth += order.total_costs ?? 0;
		}
		// This year
		if (orderDate >= thisYearStart && orderDate <= now) {
			costs.thisYear += order.total_costs ?? 0;
		}
	}

	// Calculate percentage changes
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
