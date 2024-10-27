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

export default function OrderRepair({ order }: { order: Order }) {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Reparatur</CardTitle>
				<CardDescription>Wie wurde das Problem behoben? </CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea id="repair" name="repair" defaultValue={order?.repair} />
			</CardContent>
			<CardFooter />
		</>
	);
}
