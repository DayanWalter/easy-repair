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
		<Card>
			<CardHeader className="pb-3">
				<CardTitle>Kunde</CardTitle>
				<CardDescription className="max-w-lg text-balance leading-relaxed">
					Kundennr.: {customer?.id}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Input
						type="text"
						id="name"
						value={customer?.name || ""}
						placeholder="Kein Name vorhanden"
						disabled
						autoComplete="off"
					/>
					<Input
						type="tel"
						id="phone"
						value={customer?.phone || ""}
						placeholder="Keine Telefonnummer vorhanden"
						disabled
						autoComplete="off"
					/>
					<Input
						type="email"
						id="email"
						value={customer?.email || ""}
						placeholder="Keine E-Mail vorhanden"
						disabled
						autoComplete="off"
					/>
				</div>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
