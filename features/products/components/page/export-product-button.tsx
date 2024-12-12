"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportProductsToCSV } from "@/features/products/utils/exportProductsToCSV";

type ExportProductButtonProps = {
	products: Database["public"]["Tables"]["products"]["Row"][];
};

export default function ExportProductButton({
	products,
}: ExportProductButtonProps) {
	const handleExport = () => {
		exportProductsToCSV(products);
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
