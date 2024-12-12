export function exportCustomersToCSV(
	customers: Database["public"]["Tables"]["customers"]["Row"][],
) {
	// Define CSV headers
	const headers = [
		"Kundennr.",
		"Name",
		"Email",
		"Telefon",
		"Adresse",
		"Erstellt am",
	];

	// Convert orders to CSV rows
	const rows = customers.map((customer) => [
		customer.id,
		customer.name,
		customer.email,
		customer.phone,
		customer.adress,
		customer.created_at
			? new Date(customer.created_at).toLocaleDateString("de-DE")
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
		`customers-export-${new Date().toISOString().split("T")[0]}.csv`,
	);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
