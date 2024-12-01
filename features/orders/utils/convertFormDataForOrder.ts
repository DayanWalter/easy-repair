export default function convertFormDataForOrder(
	formData: FormData,
): Database["public"]["Tables"]["orders"]["Insert"] {
	return {
		customer_id: Number(formData.get("customer_id")),
		verified: formData.get("verified") === "on",
		state: formData.get("state") as string,
		again: formData.get("again") === "on",
		old_order_id: formData.get("old_order_id") as string,
		account_access: formData.get("account_access") as string,
		account_access_more: formData.get("account_access_more") as string,
		article_device: formData.get("article_device") as string,
		article_manufacturer: formData.get("article_manufacturer") as string,
		article_accessory: formData.get("article_accessory") as string,
		date_start: formData.get("date_start")
			? (formData.get("date_start") as string)
			: null,
		date_done: formData.get("date_done")
			? (formData.get("date_done") as string)
			: null,
		date_taken: formData.get("date_taken")
			? (formData.get("date_taken") as string)
			: null,
		error_description: formData.get("error_description") as string,
		diagnose: formData.get("diagnose") as string,
		offer: formData.get("offer") as string,
		repair: formData.get("repair") as string,
		comment: formData.get("comment") as string,
		employee: formData.get("employee") as string,
		repair_time: formData.get("repair_time") as string,
		labor_costs: Number(formData.get("labor_costs")),
		material_costs: Number(formData.get("material_costs")),
		total_costs: Number(formData.get("total_costs")),
	};
}
