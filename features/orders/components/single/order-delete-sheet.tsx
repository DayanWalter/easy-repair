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

import { useToast } from "@/hooks/use-toast";
import { deleteOrder } from "../..";
import { useRouter } from "next/navigation";

export default function OrderDeleteSheet({ orderId }: { orderId: number }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteOrder = async (formData: FormData) => {
    const action = formData.get("action");
    if (action === "deleteOrder") {
      const { data, error } = await deleteOrder(String(orderId));
      if (data && data.length > 0) {
        toast({
          title: "Order Deleted",
          description: "Order was successfully deleted",
        });
      }
      router.push("/orders");
      router.refresh();

      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Error Deleting Order",
          description: "Order could not be deleted",
        });
      }
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="submit"
          name="action"
          value="deleteOrder"
          size={"lg"}
          variant={"destructive"}
          className="max-w-[250px] justify-self-end"
        >
          Delete Order
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Order</SheetTitle>
          <SheetDescription className="py-2">
            Are you sure you want to delete this order?
          </SheetDescription>
        </SheetHeader>
        <form action={handleDeleteOrder}>
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button
                type="submit"
                name="action"
                value="deleteOrder"
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
