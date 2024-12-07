import { getEndOfWeek } from "./dateCalculations";
import { getStartOfWeek } from "./dateCalculations";

// Hilfsfunktion zum Filtern der Orders nach Zeitraum
export const filterOrdersByPeriod = (
	orders: Database["public"]["Tables"]["orders"]["Row"][],
	period: "week" | "month" | "year",
) => {
	const now = new Date();

	return orders.filter(
		(order: Database["public"]["Tables"]["orders"]["Row"]) => {
			const orderDate = new Date(order.date_start ?? "");

			switch (period) {
				case "week": {
					const weekStart = getStartOfWeek(now);
					const weekEnd = getEndOfWeek(now);
					return orderDate >= weekStart && orderDate <= weekEnd;
				}

				case "month":
					return (
						orderDate.getMonth() === now.getMonth() &&
						orderDate.getFullYear() === now.getFullYear()
					);

				case "year":
					return orderDate.getFullYear() === now.getFullYear();

				default:
					return true;
			}
		},
	);
};
