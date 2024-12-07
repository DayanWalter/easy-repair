"use server";

import { createClient } from "@/utils/supabase/server";

export default async function deleteCustomer(customerId: string) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const { data, error } = await supabase
		.from("customers")
		.delete()
		.eq("id", customerId)
		.select();

	if (error) {
		console.error("Error deleting customer:", error);
	}

	return { data, error };
}
