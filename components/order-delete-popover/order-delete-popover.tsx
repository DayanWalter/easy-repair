import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import supabase from "@/database/supabaseClient";
import type { Order } from "@/types";

export const OrderDeletePopover = ({
	order,
	orders,
	setOrders,
}: {
	order: Order;
	orders: Order[];
	setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) => {
	const [error, setError] = useState<string | null>(null);
	const [deleteText, setDeleteText] = useState("");

	const handleDelete = async (id: number) => {
		const { data, error } = await supabase
			.from("orders")
			.delete()
			.eq("id", id)
			.select();

		if (error) {
			setError(`Could not delete order, Reason: ${error.message}`);
			return;
		}
		if (data) {
			setOrders(orders.filter((order) => Number(order.id) !== id));
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="destructive" size="sm">
					Delete
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Delete order</h4>
						<p className="text-sm text-muted-foreground">
							Enter "delete", if you want to delete this order
						</p>
					</div>
					<div className="grid gap-2">
						<div className="grid grid-cols-3 items-center gap-4">
							<Input
								id="delete"
								value={deleteText}
								onChange={(e) => setDeleteText(e.target.value)}
								className="col-span-2 h-8"
							/>
							<Button
								onClick={() => {
									if (deleteText === "delete") {
										handleDelete(Number(order.id));
										setDeleteText("");
									}
								}}
								variant="destructive"
								size="sm"
								disabled={deleteText.toLowerCase() !== "delete"}
							>
								DELETE
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
