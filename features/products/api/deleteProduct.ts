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

	const { data, error } = await supabase
		.from("products")
		.delete()
		.eq("id", productId)
		.select();

	if (error) {
		console.error("Error deleting product:", error);
	}

	return { data, error };
}
