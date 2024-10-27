import { createClient } from "@/utils/supabase/server";
import type { Customer } from "@/types";

export default async function createCustomer(formData: FormData) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const customerData: Customer = {
		name: formData.get("name") as string,
		adress: formData.get("adress") as string,
		phone: formData.get("phone") as string,
		email: formData.get("email") as string,
		user_id: user.id,
		updated_at: new Date(),
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
