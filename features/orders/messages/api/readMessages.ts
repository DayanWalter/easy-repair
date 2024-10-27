import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function readMessages(orderId: number) {
	const supabase = await createClient();
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
