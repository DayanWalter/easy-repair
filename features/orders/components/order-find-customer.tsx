import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import type { Customer } from "@/types";

export default function OrderFindCustomer({
	onCustomerChange,
}: {
	onCustomerChange: (customerId: number) => void;
}) {
	const [open, setOpen] = useState(false);
	const [customerName, setCustomerName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [customersLoading, setCustomersLoading] = useState<boolean>(false);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const selectedCustomer = customers.find(
		(customer) => customer.name === customerName,
	);

	useEffect(() => {
		const fetchCustomers = async () => {
			setCustomersLoading(true);
			const { data, error } = await supabase.from("customers").select("*");

			if (error) {
				setError(`Could not fetch customers, Reason: ${error.message}`);
				setCustomers([]);
				return;
			}
			if (data) {
				setCustomers(data);
				setError(null);
			}
			setCustomersLoading(false);
		};
		fetchCustomers();
	}, []);

	return (
		<Card className="" x-chunk="dashboard-05-chunk-0">
			<CardHeader className="pb-3">
				<CardTitle>Kunde</CardTitle>
				<CardDescription className="max-w-lg text-balance leading-relaxed">
					Kundennr.: {selectedCustomer?.id || "-"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								// role="combobox"
								aria-expanded={open}
								className="w-full justify-between"
							>
								{customerName
									? customers.find(
											(framework) => framework.name === customerName,
										)?.name
									: "Kunden auswählen..."}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[252px] p-0">
							<Command>
								<CommandInput placeholder="Suche Kunden..." />
								<CommandList>
									<CommandEmpty>Keinen Kunden gefunden.</CommandEmpty>
									<CommandGroup>
										{customers.map((customer) => (
											<CommandItem
												key={customer.name}
												value={customer.name}
												onSelect={(currentCustomerName) => {
													setCustomerName(
														currentCustomerName === customerName
															? ""
															: currentCustomerName,
													);
													onCustomerChange(Number(customer.id) ?? 0);
													setOpen(false);
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														customerName === customer.name
															? "opacity-100"
															: "opacity-0",
													)}
												/>
												{customer.name}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<Input
						type="phone"
						id="phone"
						placeholder={selectedCustomer?.phone || "Keinen Kunden ausgewählt"}
						disabled
					/>
					<Input
						type="email"
						id="email"
						placeholder={selectedCustomer?.email || "Keinen Kunden ausgewählt"}
						disabled
					/>
				</div>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
