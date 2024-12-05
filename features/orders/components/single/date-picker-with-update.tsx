import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function DatePickerWithUpdate({
	date,
	setDate,
	label,
	name,
	id,
}: {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	label: string;
	name: string;
	id: string;
}) {
	return (
		<div className="grid gap-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id={id}
						variant={"outline"}
						className={cn(
							"justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, "PPP") : <span>{`${label}...`}</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(newDate) => {
							setDate(newDate);
						}}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<input type="hidden" name={name} value={date?.toISOString() || ""} />
		</div>
	);
}
