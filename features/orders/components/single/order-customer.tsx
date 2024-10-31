import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrderCustomer({
	customer,
}: { customer: Database["public"]["Tables"]["customers"]["Row"] }) {
	return (
		<>
			<CardHeader className="pb-3">
				<CardTitle>Kunde</CardTitle>
				<CardDescription className="max-w-lg text-balance leading-relaxed">
					Kundennr.: {customer?.id}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Input
						type="name"
						id="name"
						placeholder={customer?.name || "Kein Name vorhanden"}
						disabled
					/>
					<Input
						type="phone"
						id="phone"
						placeholder={customer?.phone || "Keine Telefonnummer vorhanden"}
						disabled
					/>
					<Input
						type="email"
						id="email"
						placeholder={customer?.email || "Keine E-Mail vorhanden"}
						disabled
					/>
				</div>
			</CardContent>
			<CardFooter />
		</>
	);
}
