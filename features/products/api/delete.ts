import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function deleteProduct(productId: number) {
	const supabase = createServerActionClient({ cookies });

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
