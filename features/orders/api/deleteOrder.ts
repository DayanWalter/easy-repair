"use server";

import { createClient } from "@/utils/supabase/server";

export default async function deleteOrder(orderId: string) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const { error } = await supabase.from("orders").delete().eq("id", orderId);

	if (error) {
		console.error("Error deleting order:", error);
		throw new Error("Failed to delete order");
	}

	return { success: true };
}
