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
// import type { Message } from "../types/message";

export default function OrderDeleteSheet({ orderId }: { orderId: number }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteOrder = async (formData: FormData) => {
    const action = formData.get("action");
    if (action === "deleteOrder") {
      const { data, error } = await deleteOrder(String(orderId));
      if (data && data.length > 0) {
        toast({
          title: "Bestellung gelöscht",
          description: "Bestellung wurde erfolgreich gelöscht",
        });
      }
      router.push("/orders");
      router.refresh();

      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Fehler beim Löschen der Bestellung",
          description: "Bestellung konnte nicht gelöscht werden",
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
          Auftrag löschen
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Bestellung löschen</SheetTitle>
          <SheetDescription className="py-2">
            Wollen Sie diese Bestellung wirklich löschen?
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
                Löschen{" "}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
