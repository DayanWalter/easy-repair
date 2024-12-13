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
import deleteProduct from "@/features/products/api/deleteProduct";
import { useRouter } from "next/navigation";

export default function ProductDeleteSheet({
  productId,
}: {
  productId: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteProduct = async (formData: FormData) => {
    const action = formData.get("action");
    if (action === "deleteProduct") {
      const { data, error } = await deleteProduct(String(productId));
      if (data && data.length > 0) {
        toast({
          title: "Produkt gelöscht",
          description: "Produkt wurde erfolgreich gelöscht",
        });
      }
      router.push("/products");
      router.refresh();

      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Fehler beim Löschen des Produkts",
          description: "Produkt konnte nicht gelöscht werden",
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
          value="deleteProduct"
          size={"lg"}
          variant={"destructive"}
          className="max-w-[250px] justify-self-end"
        >
          Produkt löschen
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Produkt löschen</SheetTitle>
          <SheetDescription className="py-2">
            Wollen Sie dieses Produkt wirklich löschen?
          </SheetDescription>
        </SheetHeader>
        <form action={handleDeleteProduct}>
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button
                type="submit"
                name="action"
                value="deleteProduct"
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
