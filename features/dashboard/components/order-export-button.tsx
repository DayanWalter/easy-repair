"use client";

import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { exportOrdersToCSV } from "../utils/exportOrderToCSV";
import { filterOrdersByPeriod } from "../utils/filterOrdersByPeriod";

interface OrderExportButtonProps {
	orders: any[];
	period: "week" | "month" | "year";
}

export default function OrderExportButton({
	orders,
	period,
}: OrderExportButtonProps) {
	const handleExport = () => {
		const filteredOrders = filterOrdersByPeriod(orders, period);
		exportOrdersToCSV(filteredOrders);
	};

	return (
		<Button
			size="sm"
			variant="outline"
			className="h-7 gap-1 text-sm"
			onClick={handleExport}
		>
			<File className="h-3.5 w-3.5" />
			<span className="sr-only sm:not-sr-only">Export</span>
		</Button>
	);
}
