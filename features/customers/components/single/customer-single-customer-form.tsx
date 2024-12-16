"use client";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import updateCustomer from "../../api/updateCustomer";
import { useRouter } from "next/navigation";
import convertFormDataForCustomer from "../../utils/convertFormDataForCustomer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import CustomerDeleteSheet from "./customer-delete-sheet";
const customerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
  // Other validations remain commented out but translated
});
export default function SingleCustomerForm({
  customer,
  params,
}: {
  customer: Database["public"]["Tables"]["customers"]["Row"];
  params: { customerId: string };
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = async (formData: FormData) => {
    const customerData = convertFormDataForCustomer(formData);
    const result = customerSchema.safeParse(customerData);
    if (!result.success) {
      for (const issue of result.error.issues) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: issue.message,
        });
      }
    }
    const action = formData.get("action");

    if (action === "update") {
      const { data, error } = await updateCustomer(params.customerId, formData);
      if (data && data.length > 0) {
        toast({
          title: "Customer Updated",
          description: "Customer was successfully updated",
        });
        router.push("/customers");
        router.refresh();
      }
      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Customer Not Updated",
          description: "Error updating customer",
        });
      }
    }
  };

  return (
    <form action={handleFormAction}>
      <CardHeader className="pb-3">
        <CardTitle>Customer</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Customer No.: {customer?.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Customer name"
            defaultValue={customer?.name || ""}
          />

          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            id="phone"
            name="phone"
            placeholder="Customer phone number"
            defaultValue={customer?.phone || ""}
          />

          <Label htmlFor="adress">Address</Label>
          <Input
            type="text"
            id="adress"
            name="adress"
            placeholder="Customer address"
            defaultValue={customer?.adress || ""}
          />

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Customer email"
            defaultValue={customer?.email || ""}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" name="action" value="update">
          Update Customer
        </Button>
        <CustomerDeleteSheet customerId={customer.id} />
      </CardFooter>
    </form>
  );
}
