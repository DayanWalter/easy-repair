import { createClient } from "@/utils/supabase/server";

export default async function readProduct(productId: string) {
	const supabase = await createClient();

	// TODO: Add user_id to the query
	const { data: product, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", productId)
		.single();

	if (error) {
		console.error("Error reading product:", error);
		throw new Error("Failed to read product");
	}

	return product;
}
