"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { updateOrder, deleteOrder } from "@/features/orders";

import {
  OrderCustomer,
  OrderNumber,
  OrderStatus,
  OrderAccess,
  OrderArticle,
  OrderDate,
  OrderErrorDescription,
  OrderDiagnose,
  OrderOffer,
  OrderRepair,
  OrderComment,
  OrderTime,
  OrderCosts,
} from "@/features/orders/components/single";

import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import convertFormDataForOrder from "../../utils/convertFormDataForOrder";
import OrderDeleteSheet from "./order-delete-sheet";

const orderSchema = z.object({
  state: z.string().min(1, "Status ist erforderlich"),
});

export default function SingleOrderForm({
  order,
  customer,
  params,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
  customer: Database["public"]["Tables"]["customers"]["Row"];
  params: { orderId: string };
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = async (formData: FormData) => {
    console.log("use serverhandleFormAction");
    // Convert FormData to a regular object
    const orderData = convertFormDataForOrder(formData);
    // Validate the data with Zod
    const result = orderSchema.safeParse(orderData);
    // If Zod validation fails, show error messages
    if (!result.success) {
      for (const issue of result.error.issues) {
        toast({
          variant: "destructive",
          title: "Validierungsfehler",
          description: issue.message,
        });
      }
      return;
    }
    // Else update...
    const action = formData.get("action");
    if (action === "update") {
      const { data, error } = await updateOrder(params.orderId, formData);
      if (data && data.length > 0) {
        toast({
          title: "Auftrag aktualisiert",
          description: "Auftrag wurde erfolgreich aktualisiert",
        });
        router.push("/orders");
        router.refresh();
      }
      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Auftrag nicht aktualisiert",
          description: "Fehler beim Aktualisieren des Auftrags",
        });
      }
    }
  };
  return (
    <>
      <form action={handleFormAction}>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              name="action"
              value="update"
              size={"lg"}
              variant="default"
              className="max-w-[250px] justify-self-end"
            >
              Auftrag ändern
            </Button>
            <OrderDeleteSheet orderId={order.id} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <OrderCustomer customer={customer} />
            <OrderNumber order={order} />
            <OrderStatus order={order} />
            <OrderArticle order={order} />
            <OrderAccess order={order} />
            <OrderDate order={order} />
            <OrderErrorDescription order={order} />
            <OrderDiagnose order={order} />
            <OrderOffer order={order} />
            <OrderRepair order={order} />
            <OrderComment order={order} />
            <OrderTime order={order} />
            <OrderCosts order={order} />
          </div>
        </div>
      </form>
    </>
  );
}
