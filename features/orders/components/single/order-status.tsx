"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function OrderStatus({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	const [state, setState] = useState(order?.state || "");

	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Status</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<Select name="state" value={state} onValueChange={setState}>
						<SelectTrigger>
							<SelectValue placeholder="Wählen Sie einen Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="Offen">Offen</SelectItem>
								<SelectItem value="In Bearbeitung">In Bearbeitung</SelectItem>
								<SelectItem value="Erledigt">Erledigt</SelectItem>
								<SelectItem value="Abgerechnet">Abgerechnet</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="flex items-center gap-2">
						<Checkbox
							id="again"
							name="again"
							defaultChecked={order?.again ?? false}
						/>
						<Label
							htmlFor="again"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Gerät erneut da
						</Label>
					</div>
					<Label htmlFor="old_order_id">Alte Auftragsnummer</Label>
					<Input name="old_order_id" defaultValue={order?.old_order_id ?? ""} />
				</div>
			</CardContent>
			<CardFooter />
		</>
	);
}
