import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function deleteCustomer(customerId: number) {
	const supabase = createServerComponentClient({ cookies });

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
