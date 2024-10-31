import { createClient } from "@/utils/supabase/server";

export default async function readOrders() {
	const supabase = await createClient();

	// TODO: Add user_id to the query
	const { data: orders, error } = await supabase.from("orders").select("*");

	if (error) {
		console.error("Error reading orders:", error);
		throw new Error("Failed to read orders");
	}

	return orders;
}
