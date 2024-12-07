"use client";

import { Button } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";
import { deleteMessage } from "@/features/messages/api";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "../types/message";

export default function MessagesDeleteSheet({
	messageId,
	orderId,
	removeOptimisticMessage,
}: {
	messageId: number;
	orderId: number;
	removeOptimisticMessage: (params: {
		action: "add" | "delete";
		newMessage: Message;
	}) => void;
}) {
	const { toast } = useToast();
	const handleDeleteOrderMessage = async (formData: FormData) => {
		const action = formData.get("action");
		if (action === "deleteMessage") {
			// Remove optimistic message
			removeOptimisticMessage({
				action: "delete",
				newMessage: {
					id: messageId,
					author: null,
					created_at: new Date().toISOString(),
					order_id: orderId,
					text: null,
					user_id: null,
				},
			});
			const { data, error } = await deleteMessage(orderId, messageId);
			if (data && data.length > 0) {
				toast({
					title: "Nachricht gelöscht",
					description: "Nachricht wurde erfolgreich gelöscht",
				});
			}

			if ((data && data.length === 0) || error) {
				toast({
					variant: "destructive",
					title: "Fehler beim Löschen der Nachricht",
					description: "Nachricht konnte nicht gelöscht werden",
				});
			}
		}
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<Trash2 className="h-4 w-4" />
					<span className="sr-only">Nachricht löschen</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Nachricht löschen</SheetTitle>
					<SheetDescription className="py-2">
						Wollen Sie diese Nachricht wirklich löschen?
					</SheetDescription>
				</SheetHeader>
				<form action={handleDeleteOrderMessage}>
					<SheetFooter className="mt-4">
						<SheetClose asChild>
							<Button
								type="submit"
								name="action"
								value="deleteMessage"
								size={"lg"}
								variant="destructive"
								className="max-w-[250px] justify-self-end"
							>
								Löschen{" "}
							</Button>
						</SheetClose>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
