import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderRepair() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Reparatur</CardTitle>
				<CardDescription>
					Erklären Sie, was zur Behebung des Problems unternommen wurde.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea name="repair" />
			</CardContent>
			<CardFooter />
		</>
	);
}
