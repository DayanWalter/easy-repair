import Header from "@/components/header/header";
import { readCustomer } from "@/features/customers/api";
import { readMessages } from "@/features/messages/api";
import { Messages } from "@/features/messages/components";
import { readOrder } from "@/features/orders/api";
import SingleOrderForm from "@/features/orders/components/single/order-single-order-form";
import React from "react";

export default async function SingleOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await readOrder(Number(params.orderId));
  const customer = await readCustomer(order.customer_id);
  const messages = await readMessages(Number(params.orderId));

  const breadcrumbItems = [
    {
      label: "Orders",
      href: "/orders",
    },
    {
      label: String(order?.id),
      href: `/orders/${order?.id}`,
    },
  ];
  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <SingleOrderForm order={order} customer={customer} params={params} />
        <Messages messages={messages} params={params} />
      </main>
    </>
  );
}
