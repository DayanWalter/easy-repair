export function exportProductsToCSV(
	products: Database["public"]["Tables"]["products"]["Row"][],
) {
	// Define CSV headers
	const headers = [
		"Name",
		"Beschreibung",
		"Preis",
		"Lagerbestand",
		"Erstellt am",
	];

	// Convert orders to CSV rows
	const rows = products.map((product) => [
		product.name,
		product.description,
		product.price,
		product.stock,
		product.created_at
			? new Date(product.created_at).toLocaleDateString("de-DE")
			: "",
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
		`products-export-${new Date().toISOString().split("T")[0]}.csv`,
	);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
