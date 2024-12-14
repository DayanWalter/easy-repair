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

  const handleCreateOrderMessage = async (formData: FormData) => {
    const action = formData.get("action");
    if (action === "createMessage") {
      const optimisticMessage = {
        id: Date.now(),
        text: formData.get("text") as string,
        order_id: orderId,
        created_at: new Date().toISOString(),
        author: "You",
        user_id: "1",
      };
      addOptimisticMessage({
        newMessage: optimisticMessage,
        action: "add",
      });

      const { success } = await createMessage(formData, orderId);
      if (success) {
        toast({
          title: "Message Created",
          description: "Message was successfully created",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error Creating Message",
          description: "Message could not be created",
        });
      }
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>New Message</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Message</SheetTitle>
          <SheetDescription className="py-2">
            Add a new message or update to this order. This will be visible in
            the communication history.
          </SheetDescription>
        </SheetHeader>
        <form action={handleCreateOrderMessage}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="">
                Message
              </Label>
              <Textarea
                id="text"
                placeholder="Your message"
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
                New Message
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
