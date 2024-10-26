import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Trash2 } from "lucide-react";
// import { deleteOrderMessage } from "@/features/orders/orderMessages/api/delete";
import { revalidatePath } from "next/cache";
import { deleteMessage } from "../api/delete";

export default function MessagesCreateSheet({
	messageId,
	orderId,
}: { messageId: string | undefined; orderId: number }) {
	const handleDeleteOrderMessage = async (formData: FormData) => {
		"use server";
		const action = formData.get("action");
		if (action === "deleteMessage") {
			console.log("delete message", formData);
			const { success } = await deleteMessage(formData, messageId);
			if (success) {
				// Subscribe to realtime?
				revalidatePath(`/orders/${orderId}`);
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
