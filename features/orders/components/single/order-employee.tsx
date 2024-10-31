"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

export default function OrderEmployee({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	const [employee, setEmployee] = useState(order?.employee || "");

	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Mitarbeiter</CardTitle>
				<CardDescription>
					Welcher Mitarbeiter hat den Auftrag erledigt?
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Select name="employee" value={employee} onValueChange={setEmployee}>
					<SelectTrigger>
						<SelectValue placeholder="Wählen Sie einen Mitarbeiter" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Mitarbeiter</SelectLabel>
							<SelectItem value="Mitarbeiter1">Mitarbeiter1</SelectItem>
							<SelectItem value="Mitarbeiter2">Mitarbeiter2</SelectItem>
							<SelectItem value="Mitarbeiter3">Mitarbeiter3</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</CardContent>
			<CardFooter />
		</>
	);
}
