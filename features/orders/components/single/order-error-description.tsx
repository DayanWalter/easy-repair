import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderErrorDescription({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Fehlerbeschreibung</CardTitle>
				<CardDescription>
					Welcher Fehler ist aufgetreten? Bitte beschreiben Sie kurz.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea
					id="error_description"
					name="error_description"
					defaultValue={order?.error_description ?? ""}
				/>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
