export const orders = [
	{
		order_id: 1,
		order_customer_id: 2,
		order_verified: true,
		order_state: "Abgeschlossen",
		order_again: false,
		order_old_order_id: "",
		order_communication: [
			{
				id: "5kma53ae",
				message: "Gerät ist zur Abholung bereit",
				who: "Wir",
				date: "2024-03-10",
			},
			{
				id: "bhqecj4p",
				message: "Ich hole es morgen ab",
				who: "Kunde",
				date: "2024-03-11",
			},
		],
		order_account_access: "Keine Zugangsdaten erforderlich",
		order_account_access_more: "",
		order_article_device: "iPhone 12",
		order_article_manufaturer: "Apple",
		order_article_accessory: "Ladekabel",
		order_date_start: "2024-03-08",
		order_date_done: "2024-03-10",
		order_date_taken: "2024-03-12",
		order_error_description: "Akku hält nicht lange",
		order_diagnose: "Akkukapazität auf 70% gesunken",
		order_offer: "Akkutausch für 79€",
		order_repair: "Akkutausch durchgeführt",
		order_comment: "Kunde sehr zufrieden",
		order_employee: "Max Mustermann",
		order_repair_time: "1 Stunde",
		order_labor_costs: "40",
		order_material_costs: "39",
		order_costs: "79",
	},
	{
		order_id: 2,
		order_customer_id: 5,
		order_verified: true,
		order_state: "In Arbeit",
		order_again: false,
		order_old_order_id: "",
		order_communication: [
			{
				id: "7nba64bf",
				message: "Laptop zur Reparatur abgegeben",
				who: "Wir",
				date: "2024-03-15",
			},
		],
		order_account_access: "Benutzer: kunde5, Passwort: *****",
		order_account_access_more: "PIN für BIOS: 1234",
		order_article_device: "ThinkPad X1 Carbon",
		order_article_manufaturer: "Lenovo",
		order_article_accessory: "Netzteil",
		order_date_start: "2024-03-15",
		order_date_done: undefined,
		order_date_taken: undefined,
		order_error_description: "Bluescreen bei Systemstart",
		order_diagnose: "Festplatte defekt",
		order_offer: "SSD-Austausch und Neuinstallation für 180€",
		order_repair: "",
		order_comment: "Kunde wünscht Datensicherung wenn möglich",
		order_employee: "Anna Schmidt",
		order_repair_time: "",
		order_labor_costs: "",
		order_material_costs: "",
		order_costs: "",
	},
	{
		order_id: 3,
		order_customer_id: 8,
		order_verified: false,
		order_state: "Annahme",
		order_again: true,
		order_old_order_id: "3298",
		order_communication: [],
		order_account_access: "",
		order_account_access_more: "",
		order_article_device: "Galaxy S21",
		order_article_manufaturer: "Samsung",
		order_article_accessory: "",
		order_date_start: "2024-03-18",
		order_date_done: undefined,
		order_date_taken: undefined,
		order_error_description: "Display gebrochen",
		order_diagnose: "",
		order_offer: "",
		order_repair: "",
		order_comment: "Eilauftrag, Kunde braucht Gerät bis Ende der Woche",
		order_employee: "",
		order_repair_time: "",
		order_labor_costs: "",
		order_material_costs: "",
		order_costs: "",
	},
	// ... Weitere Aufträge können hier hinzugefügt werden ...
];
