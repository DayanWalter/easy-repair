import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function readProduct(productId: number) {
	const supabase = createServerComponentClient({ cookies });

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

export async function readProducts() {
	const supabase = createServerComponentClient({ cookies });

	// TODO: Add user_id to the query
	const { data: products, error } = await supabase.from("products").select("*");

	if (error) {
		console.error("Error reading products:", error);
		throw new Error("Failed to read products");
	}

	return products;
}
