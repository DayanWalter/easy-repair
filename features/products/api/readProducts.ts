import { createClient } from "@/utils/supabase/server";

export default async function readProducts() {
	const supabase = await createClient();

	// TODO: Add user_id to the query
	const { data: products, error } = await supabase.from("products").select("*");

	if (error) {
		console.error("Error reading products:", error);
		throw new Error("Failed to read products");
	}

	return products;
}
