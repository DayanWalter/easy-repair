import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createMessage } from "@/features/messages/api";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "../types/message";

export default function MessageCreateSheet({
	orderId,
	addOptimisticMessage,
}: {
	orderId: number;
	addOptimisticMessage: (params: {
		action: "add" | "delete";
		newMessage: Message;
	}) => void;
}) {
	const { toast } = useToast();
	// Client action
	const handleCreateOrderMessage = async (formData: FormData) => {
		const action = formData.get("action");
		if (action === "createMessage") {
			// Create optimistic message
			const optimisticMessage = {
				id: Date.now(),
				text: formData.get("text") as string,
				order_id: orderId,
				created_at: new Date().toISOString(),
				author: "You", // Change to auth context
				user_id: "1",
			};
			// Add optimistic update
			addOptimisticMessage({
				newMessage: optimisticMessage,
				action: "add",
			});

			const { success } = await createMessage(formData, orderId);
			if (success) {
				toast({
					title: "Nachricht erstellt",
					description: "Nachricht wurde erfolgreich erstellt",
				});
			} else {
				toast({
					variant: "destructive",
					title: "Fehler beim Erstellen der Nachricht",
					description: "Nachricht konnte nicht erstellt werden",
				});
			}
		}
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>Neue Nachricht</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Neue Nachricht</SheetTitle>
					<SheetDescription className="py-2">
						Fügen Sie eine neue Nachricht oder Aktualisierung zu diesem Auftrag
						hinzu. Dies wird im Kommunikationsverlauf sichtbar sein.
					</SheetDescription>
				</SheetHeader>
				<form action={handleCreateOrderMessage}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="text" className="">
								Nachricht
							</Label>
							<Textarea
								id="text"
								placeholder="Ihre Nachricht"
								name="text"
								className="col-span-3"
								required
							/>
						</div>
					</div>
					<SheetFooter className="mt-4">
						<SheetClose asChild>
							<Button
								type="submit"
								name="action"
								value="createMessage"
								size={"lg"}
								variant="default"
								className="max-w-[250px] justify-self-end"
							>
								Neue Nachricht
							</Button>
						</SheetClose>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
