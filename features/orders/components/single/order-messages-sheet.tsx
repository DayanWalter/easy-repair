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
import { createOrderMessage } from "@/features/orders/api/create";

export default function OrderMessagesSheet() {
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
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="author" className="">
							Name
						</Label>
						<Input
							id="author"
							name="author"
							placeholder="Ihr Name"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="text" className="">
							Nachricht
						</Label>
						<Textarea
							id="text"
							placeholder="Ihre Nachricht"
							name="text"
							className="col-span-3"
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
							variant={"default"}
							className="max-w-[250px] justify-self-end"
						>
							Neue Nachricht
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
