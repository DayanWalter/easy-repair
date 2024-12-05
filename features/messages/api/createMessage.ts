"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function createMessage(
	formData: FormData,
	orderId: number,
) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}
	const messageData: Database["public"]["Tables"]["messages"]["Insert"] = {
		author: user.user_metadata.name,
		text: formData.get("text") as string,
		order_id: orderId,
		user_id: user.id,
	};
	const { data, error } = await supabase
		.from("messages")
		.insert({
			...messageData,
		})
		.select();

	if (error) {
		console.error("Error creating message:", error);
		throw new Error("Failed to create message");
	}
	revalidatePath(`/orders/${orderId}`);

	return { success: true, message: data[0] };
}
