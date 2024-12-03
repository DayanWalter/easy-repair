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
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function MessageCreateSheet({ orderId }: { orderId: number }) {
	const { toast } = useToast();
	const router = useRouter();

	const handleCreateOrderMessage = async (formData: FormData) => {
		const action = formData.get("action");
		if (action === "createMessage") {
			const { success } = await createMessage(formData, orderId);
			if (success) {
				// Optimistic UI
				// revalidatePath(`/orders/${orderId}`);
				// router.push(`/orders/${orderId}`);
				// router.refresh();
				console.log("success");
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
						<SheetClose>
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
