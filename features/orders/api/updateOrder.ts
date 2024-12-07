"use server";

import { createClient } from "@/utils/supabase/server";

export default async function updateOrder(orderId: string, formData: FormData) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}
	const orderData: Database["public"]["Tables"]["orders"]["Update"] = {
		account_access: formData.get("account_access") as string,
		account_access_more: formData.get("account_access_more") as string,
		again: formData.get("again") === "on",
		article_accessory: formData.get("article_accessory") as string,
		article_device: formData.get("article_device") as string,
		article_manufacturer: formData.get("article_manufacturer") as string,
		comment: formData.get("comment") as string,
		date_start: formData.get("date_start")
			? (formData.get("date_start") as string)
			: null,
		date_done: formData.get("date_done")
			? (formData.get("date_done") as string)
			: null,
		date_taken: formData.get("date_taken")
			? (formData.get("date_taken") as string)
			: null,
		diagnose: formData.get("diagnose") as string,
		employee: formData.get("employee") as string,
		error_description: formData.get("error_description") as string,
		labor_costs: Number(formData.get("labor_costs")),
		material_costs: Number(formData.get("material_costs")),
		offer: formData.get("offer") as string,
		old_order_id: formData.get("old_order_id") as string,
		repair: formData.get("repair") as string,
		repair_time: formData.get("repair_time") as string,
		state: formData.get("state") as string,
		total_costs: Number(formData.get("total_costs")),
		verified: formData.get("verified") === "on",
	};

	const { data, error } = await supabase
		.from("orders")
		.update({
			...orderData,
		})
		.eq("id", orderId)
		.select();

	if (error) {
		console.error("Error updating order:", error);
	}

	return { data, error };
}
