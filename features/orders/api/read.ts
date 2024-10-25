import {
	createServerActionClient,
	createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function readOrders() {
	const supabase = createServerActionClient({ cookies });

	// TODO: Add user_id to the query
	const { data: orders, error } = await supabase.from("orders").select("*");

	if (error) {
		console.error("Error reading orders:", error);
		throw new Error("Failed to read orders");
	}

	return orders;
}

export async function readOrder(orderId: number) {
	const supabase = createServerComponentClient({ cookies });

	// TODO: Add user_id to the query
	const { data: order, error } = await supabase
		.from("orders")
		.select("*")
		.eq("id", orderId)
		.single();
	if (error) {
		console.error("Error reading order:", error);
		throw new Error("Failed to read order");
	}
	return order;
}

export async function readCustomer(customerId: number) {
	const supabase = createServerComponentClient({ cookies });
	const { data: customer, error } = await supabase
		.from("customers")
		.select("*")
		.eq("id", customerId)
		.single();
	if (error) {
		console.error("Error reading customer:", error);
		throw new Error("Failed to read customer");
	}
	return customer;
}
export async function readOrderMessages(orderId: number) {
	const supabase = createServerComponentClient({ cookies });
	const { data: orderMessages, error } = await supabase
		.from("order_communication")
		.select("*")
		.eq("order_id", orderId);
	if (error) {
		console.error("Error reading order messages:", error);
		throw new Error("Failed to read order messages");
	}
	return orderMessages;
}
