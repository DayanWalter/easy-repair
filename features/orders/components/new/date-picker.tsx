"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	name: string;
	label: string;
}

export default function DatePicker({ name, label }: DatePickerProps) {
	const [date, setDate] = useState<Date>();

	return (
		<div className="grid gap-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"w-[240px] justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, "PPP") : <span>{label}</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(newDate) => {
							setDate(newDate);
							const input = document.querySelector(
								`input[name="${name}"]`,
							) as HTMLInputElement;
							if (input && newDate) {
								input.value = newDate.toISOString();
							}
						}}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<input type="hidden" name={name} />
		</div>
	);
}
