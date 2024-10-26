import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function readMessages(orderId: number) {
	const supabase = createServerComponentClient({ cookies });
	const { data: messages, error } = await supabase
		.from("messages")
		.select("*")
		.eq("order_id", orderId);
	if (error) {
		console.error("Error reading order messages:", error);
		throw new Error("Failed to read order messages");
	}
	return messages;
}
