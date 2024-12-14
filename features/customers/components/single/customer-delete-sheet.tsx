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
          title: "Customer Deleted",
          description: "Customer was successfully deleted",
        });
      }
      router.push("/customers");
      router.refresh();

      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Error Deleting Customer",
          description: "Customer could not be deleted",
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
          Delete Customer
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Customer</SheetTitle>
          <SheetDescription className="py-2">
            Are you sure you want to delete this customer?
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
                Delete
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
