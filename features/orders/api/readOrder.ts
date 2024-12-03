"use server";

import { createClient } from "@/utils/supabase/server";

export default async function readOrder(orderId: number) {
	const supabase = await createClient();

	// TODO: Add user_id to the query
	const { data: order, error } = await supabase
		.from("orders")
		.select("*")
		.eq("id", orderId)
		.single();
	if (error) {
		console.error("Error reading order:", error);
		throw new Error("Failed to read order");
	}
	return order;
}
