"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function deleteMessage(
	orderId: number,
	messageId: number,
) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}
	const { data, error } = await supabase
		.from("messages")
		.delete()
		.eq("id", messageId)
		.select();

	if (error) {
		console.error("Error deleting message:", error);
	}

	revalidatePath(`/orders/${orderId}`);
	return { data, error };
}
