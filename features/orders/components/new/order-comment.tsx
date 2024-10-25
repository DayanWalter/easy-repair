import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderComment() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Anmerkungen</CardTitle>
				<CardDescription>
					Teilen Sie zusätzliche relevante Informationen mit.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea name="comment" />
			</CardContent>
			<CardFooter />
		</>
	);
}
