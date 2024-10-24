import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function readOrders() {
	const supabase = createServerActionClient({ cookies });

	// TODO: Add user_id to the query
	const { data: orders, error } = await supabase.from("orders").select("*");

	if (error) {
		console.error("Error reading orders:", error);
		throw new Error("Failed to read orders");
	}

	return orders;
}
