import { createClient } from "@/utils/supabase/server";

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

	return { success: true, message: data[0] };
}
