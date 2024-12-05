import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrderTime({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Reparaturzeit in Std.</CardTitle>
				<CardDescription>Wie lange hat die Reparatur gedauert?</CardDescription>
			</CardHeader>
			<CardContent>
				<Input
					type="number"
					step="0.01"
					id="repair_time"
					name="repair_time"
					defaultValue={order?.repair_time ?? ""}
				/>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
