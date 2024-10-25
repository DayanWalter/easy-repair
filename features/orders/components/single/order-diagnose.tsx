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

export default function OrderDiagnose({ order }: { order: Order }) {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Diagnose</CardTitle>
				<CardDescription>
					Geben Sie die Ursache des Problems an.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea
					id="diagnose"
					name="diagnose"
					defaultValue={order?.diagnose}
				/>
			</CardContent>
			<CardFooter />
		</>
	);
}
