export function exportOrdersToCSV(
	orders: Database["public"]["Tables"]["orders"]["Row"][],
) {
	// Define CSV headers
	const headers = [
		"Auftragsnr.",
		"Kundennr.",
		"Status",
		"Gerät",
		"Startdatum",
		"Gesamtbetrag",
	];

	// Convert orders to CSV rows
	const rows = orders.map((order) => [
		order.id,
		order.customer_id,
		order.state,
		order.article_device,
		order.date_start
			? new Date(order.date_start).toLocaleDateString("de-DE")
			: "",
		order.total_costs ? `${order.total_costs.toFixed(2)} €` : "0,00 €",
	]);

	// Combine headers and rows
	const csvContent = [
		headers.join(";"), // Using semicolon for better Excel compatibility in German locale
		...rows.map((row) => row.join(";")),
	].join("\n");

	// Create blob and download
	const blob = new Blob([`\ufeff${csvContent}`], {
		type: "text/csv;charset=utf-8;",
	}); // Adding BOM for Excel
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");

	link.setAttribute("href", url);
	link.setAttribute(
		"download",
		`orders-export-${new Date().toISOString().split("T")[0]}.csv`,
	);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
