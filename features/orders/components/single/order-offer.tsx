import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderOffer({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Angebot</CardTitle>
				<CardDescription>
					Welche Leistungen und Kosten umfasst Ihr Angebot?
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea id="offer" name="offer" defaultValue={order?.offer ?? ""} />
			</CardContent>
			<CardFooter />
		</>
	);
}
