"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function deleteCustomer(customerId: string) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const { error } = await supabase
		.from("customers")
		.delete()
		.eq("id", customerId);

	if (error) {
		console.error("Error deleting customer:", error);
		throw new Error("Failed to delete customer");
	}

	return { success: true };
}
