import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function deleteMessage(
	formData: FormData,
	messageId: string | undefined,
) {
	console.log("delete message", formData, messageId);

	const supabase = createServerComponentClient({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}
	const { error } = await supabase
		.from("messages")
		.delete()
		.eq("id", messageId);
	if (error) {
		console.error("Error deleting message:", error);
		throw new Error("Failed to delete message");
	}

	return { success: true };
}
