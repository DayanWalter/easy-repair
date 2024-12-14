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
          title: "Message Deleted",
          description: "Message was successfully deleted",
        });
      }

      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Error Deleting Message",
          description: "Message could not be deleted",
        });
      }
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete message</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Message</SheetTitle>
          <SheetDescription className="py-2">
            Are you sure you want to delete this message?
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
                Delete
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
