import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function readCustomer(customerId: string) {
	const supabase = await createClient();

	// TODO: Add user_id to the query
	const { data: customer, error } = await supabase
		.from("customers")
		.select("*")
		.eq("id", customerId)
		.single();

	if (error) {
		console.error("Error reading customer:", error);
		throw new Error("Failed to read customer");
	}

	return customer;
}
