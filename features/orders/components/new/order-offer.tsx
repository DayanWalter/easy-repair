import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderOffer() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Angebot</CardTitle>
				<CardDescription>
					Beschreiben Sie die vorgeschlagenen Maßnahmen und die Kosten.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea name="offer" />
			</CardContent>
			<CardFooter />
		</Card>
	);
}