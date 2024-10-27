import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Customer } from "@/types";

export default async function updateCustomer(
	customerId: number,
	formData: FormData,
) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const customerData: Customer = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		phone: formData.get("phone") as string,
		adress: formData.get("adress") as string,
		user_id: user.id,
		updated_at: new Date(),
	};
	const { data, error } = await supabase
		.from("customers")
		.update({
			...customerData,
		})
		.eq("id", customerId)
		.select();

	if (error) {
		console.error("Error updating customer:", error);
		throw new Error("Failed to update customer");
	}

	return { success: true, customer: data[0] };
}
