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
          title: "Product Deleted",
          description: "Product was successfully deleted",
        });
      }
      router.push("/products");
      router.refresh();

      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Error Deleting Product",
          description: "Product could not be deleted",
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
          Delete Product
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Product</SheetTitle>
          <SheetDescription className="py-2">
            Are you sure you want to delete this product?
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
                Delete
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
