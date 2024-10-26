import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function readCustomer(customerId: number) {
	const supabase = createServerComponentClient({ cookies });

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

export async function readCustomers() {
	const supabase = createServerComponentClient({ cookies });

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
