import type { Message } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createMessage(formData: FormData, orderId: number) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}
	const messageData: Message = {
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

	return { success: true, message: data[0] };
}
