import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Order } from "@/types";

export default function OrderComment({ order }: { order: Order }) {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Anmerkungen</CardTitle>
				<CardDescription>
					Teilen Sie zusätzliche relevante Informationen mit.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea id="comment" name="comment" defaultValue={order?.comment} />
			</CardContent>
			<CardFooter />
		</>
	);
}
