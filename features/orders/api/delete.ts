import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function deleteOrder(orderId: string) {
	const supabase = createServerActionClient({ cookies });

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
