"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import OrderFindCustomer from "./order-find-customer";
import OrderNumber from "./order-number";
import OrderStatus from "./order-status";
import OrderAccess from "./order-access";
import OrderArticle from "./order-article";
import OrderDate from "./order-date";
import OrderErrorDescription from "./order-error-description";
import OrderDiagnose from "./order-diagnose";
import OrderOffer from "./order-offer";
import OrderRepair from "./order-repair";
import OrderComment from "./order-comment";
import OrderTime from "./order-time";
import OrderCosts from "./order-costs";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import createOrder from "../../api/createOrder";
import { useRouter } from "next/navigation";
import convertFormDataForOrder from "@/features/orders/utils/convertFormDataForOrder";

const orderSchema = z.object({
  customer_id: z
    .number({ message: "Please select a customer" })
    .min(1, "Customer name is required"),
  state: z.string().min(1, "Status is required"),
});

export default function NewOrderForm() {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = async (formData: FormData) => {
    const orderData = convertFormDataForOrder(formData);
    const result = orderSchema.safeParse(orderData);

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

    const { success } = await createOrder(formData);

    if (success) {
      toast({
        title: "Order Created Successfully",
        description: "Order has been successfully created",
      });
      router.push("/orders");
      router.refresh();
    }
  };

  return (
    <form action={handleFormAction}>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <OrderFindCustomer />
          <OrderNumber />
          <OrderStatus />
          <OrderAccess />
          <OrderArticle />
          <OrderDate />
          <OrderErrorDescription />
          <OrderDiagnose />
          <OrderOffer />
          <OrderRepair />
          <OrderComment />
          <OrderTime />
          <OrderCosts />
        </div>
        <Button
          type="submit"
          size={"lg"}
          variant="default"
          className="max-w-[250px] justify-self-end"
        >
          Create Order
        </Button>
      </div>
    </form>
  );
}
