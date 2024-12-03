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
import { revalidatePath } from "next/cache";
import { deleteMessage } from "@/features/messages/api";

export default function MessagesDeleteSheet({
	messageId,
	orderId,
}: { messageId: string | undefined; orderId: number }) {
	const handleDeleteOrderMessage = async (formData: FormData) => {
		const action = formData.get("action");
		if (action === "deleteMessage") {
			const { success } = await deleteMessage(formData, messageId);
			if (success) {
				// Optimistic UI
				// revalidatePath(`/orders/${orderId}`);
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
						<SheetClose>
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
