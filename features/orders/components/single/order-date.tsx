"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { useState } from "react";
import DatePickerWithUpdate from "./date-picker-with-update";
import { Label } from "@/components/ui/label";

export default function OrderDateUpdate({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	const [dateStart, setDateStart] = useState<Date | undefined>(
		order.date_start ? new Date(order.date_start) : undefined,
	);
	const [dateDone, setDateDone] = useState<Date | undefined>(
		order.date_done ? new Date(order.date_done) : undefined,
	);
	const [dateTaken, setDateTaken] = useState<Date | undefined>(
		order.date_taken ? new Date(order.date_taken) : undefined,
	);

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Datum</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div>
						<Label htmlFor="date_start">Annahme</Label>
						<DatePickerWithUpdate
							id="date_start"
							date={dateStart}
							setDate={setDateStart}
							label="Annahme"
							name="date_start"
						/>
					</div>
					<div>
						<Label htmlFor="date_done">Fertiggestellt</Label>
						<DatePickerWithUpdate
							id="date_done"
							date={dateDone}
							setDate={setDateDone}
							label="Fertiggestellt"
							name="date_done"
						/>
					</div>
					<div>
						<Label htmlFor="date_taken">Abgeholt</Label>
						<DatePickerWithUpdate
							id="date_taken"
							date={dateTaken}
							setDate={setDateTaken}
							label="Abgeholt"
							name="date_taken"
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
