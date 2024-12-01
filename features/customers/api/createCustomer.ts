"use server";
import { createClient } from "@/utils/supabase/server";

export default async function createCustomer(formData: FormData) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const customerData: Database["public"]["Tables"]["customers"]["Insert"] = {
		name: formData.get("name") as string,
		adress: formData.get("adress") as string,
		phone: formData.get("phone") as string,
		email: formData.get("email") as string,
		user_id: user.id,
	};

	const { data, error } = await supabase
		.from("customers")
		.insert({
			...customerData,
		})
		.select();

	if (error) {
		console.error("Error creating customer:", error);
		throw new Error("Failed to create customer");
	}

	return { success: true, customer: data[0] };
}
