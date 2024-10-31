import {
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function OrderNumber({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	return (
		<>
			<CardHeader className="pb-3">
				<CardTitle>Auftragsnummer</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<Input placeholder={order?.id.toString()} disabled />
					<div className="flex items-center gap-2">
						<Checkbox
							id="verified"
							name="verified"
							defaultChecked={order?.verified ?? false}
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
