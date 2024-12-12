"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportCustomersToCSV } from "../../utils/exportCustomersToCSV";

type ExportCustomerButtonProps = {
	customers: Database["public"]["Tables"]["customers"]["Row"][];
};

export default function ExportCustomerButton({
	customers,
}: ExportCustomerButtonProps) {
	const handleExport = () => {
		exportCustomersToCSV(customers);
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
