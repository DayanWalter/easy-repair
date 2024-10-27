import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Order } from "@/types";

export default function OrderNumber({ order }: { order: Order }) {
	return (
		<>
			<CardHeader className="pb-3">
				<CardTitle>Auftragsnummer</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Input placeholder={order?.id} disabled />
					<div className="flex items-center space-x-2">
						<Checkbox
							id="verified"
							name="verified"
							defaultChecked={order?.verified}
						/>
						<label
							htmlFor="verified"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Auftrag erteilt
						</label>
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</>
	);
}
