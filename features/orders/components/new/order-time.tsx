import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrderTime() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Zeit</CardTitle>
				<CardDescription>Wie lange hat die Reparatur gedauert?</CardDescription>
			</CardHeader>
			<CardContent>
				<Input name="repair_time" type="text" />
			</CardContent>
			<CardFooter />
		</>
	);
}
