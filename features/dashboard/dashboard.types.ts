export type CostMetrics = {
	thisWeek: number;
	lastWeek: number;
	thisMonth: number;
	lastMonth: number;
	thisYear: number;
	weeklyChange: number;
	monthlyChange: number;
};

export type OrderCosts = {
	date_start: string | Date | null;
	total_costs: number | null;
};
