import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function OrderCommunikation() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Kommunikation</CardTitle>
				<CardDescription>Dies ist der Kommunikationsverlauf</CardDescription>
			</CardHeader>
			<CardContent />
			<CardFooter />
		</>
	);
}
