import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Order } from "@/types";

export async function updateOrder(orderId: string, formData: FormData) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}
	const orderData: Order = {
		verified: formData.get("verified") === "on",
		state: formData.get("state") as string,
		again: formData.get("again") === "on",
		old_order_id: formData.get("old_order_id") as string,
		account_access: formData.get("account_access") as string,
		account_access_more: formData.get("account_access_more") as string,
		article_device: formData.get("article_device") as string,
		article_manufacturer: formData.get("article_manufacturer") as string,
		article_accessory: formData.get("article_accessory") as string,
		date_start: new Date(formData.get("date_start") as string),
		date_done: new Date(formData.get("date_done") as string),
		date_taken: new Date(formData.get("date_taken") as string),
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
		user_id: user.id,
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
		throw new Error("Failed to update order");
	}

	return { success: true, order: data[0] };
}
