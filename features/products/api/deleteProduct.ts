"use server";

import { createClient } from "@/utils/supabase/server";

export default async function deleteProduct(productId: string) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const { error } = await supabase
		.from("products")
		.delete()
		.eq("id", productId);

	if (error) {
		console.error("Error deleting product:", error);
		throw new Error("Failed to delete product");
	}

	return { success: true };
}
