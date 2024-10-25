import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderError() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Fehlerbeschreibung</CardTitle>
				<CardDescription>
					Beschreiben Sie das aufgetretene Problem.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea name="error_description" />
			</CardContent>
			<CardFooter />
		</>
	);
}
