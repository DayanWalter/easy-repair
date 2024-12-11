"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportOrdersToCSV } from "../utils/exportOrderToCSV";

type OrderExportButtonProps = {
	orders: Database["public"]["Tables"]["orders"]["Row"][];
};

export default function OrderExportButton({ orders }: OrderExportButtonProps) {
	const handleExport = () => {
		exportOrdersToCSV(orders);
	};

	return (
		<Button
			variant="outline"
			size="sm"
			className="h-7 gap-1 text-sm"
			onClick={handleExport}
		>
			<Download className="h-3.5 w-3.5" />
			<span className="sr-only sm:not-sr-only">Export</span>
		</Button>
	);
}
