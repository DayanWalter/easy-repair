"use server";

import { createClient } from "@/utils/supabase/server";

export default async function updateProduct(
	productId: string,
	formData: FormData,
) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const productData: Database["public"]["Tables"]["products"]["Update"] = {
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		price: formData.get("price") as unknown as number,
		category: formData.get("category") as string,
		stock: formData.get("stock") as unknown as number,
		sku: formData.get("sku") as string,
		manufacturer: formData.get("manufacturer") as string,
		image: formData.get("image") as string,
		updated_at: new Date().toISOString(),
	};
	const { data, error } = await supabase
		.from("products")
		.update({
			...productData,
		})
		.eq("id", productId)
		.select();

	if (error) {
		console.error("Error updating product:", error);
	}

	return { data, error };
}
