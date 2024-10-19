import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import supabase from "@/database/supabaseClient";
import type { Customer } from "@/types";

export const CustomerDeletePopover = ({
	customer,
	customers,
	setCustomers,
}: {
	customer: Customer;
	customers: Customer[];
	setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}) => {
	const [error, setError] = useState<string | null>(null);
	const [deleteText, setDeleteText] = useState("");

	const handleDelete = async (id: number) => {
		const { data, error } = await supabase
			.from("customers")
			.delete()
			.eq("id", id)
			.select();

		if (error) {
			setError(`Could not delete customer, Reason: ${error.message}`);
			return;
		}
		if (data) {
			setCustomers(customers.filter((customer) => Number(customer.id) !== id));
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
						<h4 className="font-medium leading-none">Kunde löschen</h4>
						<p className="text-sm text-muted-foreground">
							Geben Sie &quot;delete&quot; ein, um diesen Kunden zu löschen
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
										handleDelete(Number(customer.id));
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
};
