"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import createCustomer from "../../api/createCustomer";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import convertFormDataForCustomer from "../../utils/convertFormDataForCustomer";

const customerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
  // adress: z
  // 	.string({ message: "Adresse ist erforderlich" })
  // 	.min(5, "Adresse muss mindestens 5 Zeichen lang sein")
  // 	.max(100, "Adresse darf maximal 100 Zeichen lang sein"),
  // phone: z
  // 	.string({ message: "Telefonnummer ist erforderlich" })
  // 	.min(5, "Telefonnummer muss mindestens 5 Zeichen lang sein")
  // 	.max(20, "Telefonnummer darf maximal 20 Zeichen lang sein")
  // 	.optional(),
  // email: z
  // 	.string({ message: "E-Mail ist erforderlich" })
  // 	.email("Ungültige E-Mail-Adresse")
  // 	.optional(),
});
export default function NewCustomerForm() {
  const { toast } = useToast();
  const router = useRouter();

  const handleCreateCustomer = async (formData: FormData) => {
    // Convert FormData to a regular object
    const customerData = convertFormDataForCustomer(formData);
    // // Validate the data with Zod
    const result = customerSchema.safeParse(customerData);
    // // If Zod validation fails, show error messages
    if (!result.success) {
      for (const issue of result.error.issues) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: issue.message,
        });
      }
      return;
    }
    // // Else create the customer
    const { success } = await createCustomer(formData);
    if (success) {
      toast({
        title: "Customer Created",
        description: "Customer was successfully created",
      });
      router.push("/customers");
      router.refresh();
    }
  };
  return (
    <form action={handleCreateCustomer}>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid xl:grid-cols-2">
            <Card className="" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Customer</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {/* Id: {customerId} */}
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
                  />

                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Customer phone number"
                  />

                  <Label htmlFor="adress">Address</Label>
                  <Input
                    type="text"
                    id="adress"
                    name="adress"
                    placeholder="Customer street and house number"
                  />

                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Customer email"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Create Customer</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </form>
  );
}
