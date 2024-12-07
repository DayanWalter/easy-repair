import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/features/orders/components/new";

export default function OrderDate() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Datum</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div>
						<Label htmlFor="date_start">Annahme</Label>
						<DatePicker name="date_start" label="Angenommen am..." />
					</div>
					<div>
						<Label htmlFor="date_done">Fertiggestellt</Label>
						<DatePicker name="date_done" label="Fertiggestellt am..." />
					</div>
					<div>
						<Label htmlFor="date_taken">Abgeholt</Label>
						<DatePicker name="date_taken" label="Abgeholt am..." />
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
