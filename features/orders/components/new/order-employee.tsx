import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
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

export default function OrderEmployee() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Mitarbeiter</CardTitle>
				<CardDescription>
					Welcher Mitarbeiter hat den Auftrag erledigt?
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Select name="employee">
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
