import { createClient } from "@/utils/supabase/server";

export default async function readCustomers() {
	const supabase = await createClient();

	// TODO: Add user_id to the query
	const { data: customers, error } = await supabase
		.from("customers")
		.select("*");

	if (error) {
		console.error("Error reading customers:", error);
		throw new Error("Failed to read customers");
	}

	return customers;
}
