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
import deleteCustomer from "@/features/customers/api/deleteCustomer";
import { useRouter } from "next/navigation";

export default function CustomerDeleteSheet({
  customerId,
}: {
  customerId: number;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteCustomer = async (formData: FormData) => {
    const action = formData.get("action");
    if (action === "deleteCustomer") {
      const { data, error } = await deleteCustomer(String(customerId));
      if (data && data.length > 0) {
        toast({
          title: "Kunde gelöscht",
          description: "Kunde wurde erfolgreich gelöscht",
        });
      }
      router.push("/customers");
      router.refresh();

      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Fehler beim Löschen des Kunden",
          description: "Kunde konnte nicht gelöscht werden",
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
          value="deleteCustomer"
          size={"lg"}
          variant={"destructive"}
          className="max-w-[250px] justify-self-end"
        >
          Kunde löschen
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Kunde löschen</SheetTitle>
          <SheetDescription className="py-2">
            Wollen Sie diesen Kunden wirklich löschen?
          </SheetDescription>
        </SheetHeader>
        <form action={handleDeleteCustomer}>
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button
                type="submit"
                name="action"
                value="deleteCustomer"
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
