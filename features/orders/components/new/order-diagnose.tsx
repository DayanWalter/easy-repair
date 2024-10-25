import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderDiagnose() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Diagnose</CardTitle>
				<CardDescription>
					Geben Sie die Ursache des Problems an.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea name="diagnose" />
			</CardContent>
			<CardFooter />
		</>
	);
}
