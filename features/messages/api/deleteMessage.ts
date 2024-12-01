import { createClient } from "@/utils/supabase/server";

export default async function deleteMessage(
	formData: FormData,
	messageId: string | undefined,
) {
	const supabase = await createClient();
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
