"use client";
import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/database/supabaseClient";
import type { Order } from "@/types";
import { useRouter } from "next/navigation";

export default function OrderDeletePopover({
	order,
}: {
	order: Order;
}) {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
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
			router.push("/orders");
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="destructive" size="sm">
					Löschen
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Auftrag löschen</h4>
						<p className="text-sm text-muted-foreground">
							Geben Sie &quot;delete&quot; ein, um diesen Auftrag zu löschen
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
									if (deleteText.toLowerCase() === "delete") {
										handleDelete(Number(order.id));
										setDeleteText("");
									}
								}}
								variant="destructive"
								size="sm"
								disabled={deleteText.toLowerCase() !== "delete"}
							>
								LÖSCHEN
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
