import Header from "@/components/header/header";

import { readOrder } from "@/features/orders";
import { readCustomer } from "@/features/customers";
import SingleOrderForm from "@/features/orders/components/single/order-single-order-form";
import Messages from "@/features/messages/components/messages";
import React from "react";
import { redirect, useRouter } from "next/navigation";
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
	OrderEmployee,
	OrderTime,
	OrderCosts,
} from "@/features/orders/components/single";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
// import convertFormDataForOrder from "../../utils/convertFormDataForOrder";
import { readMessages } from "@/features/messages/api";

const orderSchema = z.object({
	state: z.string().min(1, "Status ist erforderlich"),
});

type Props = {
	params: {
		orderId: string;
	};
};

export default async function SingleOrder({ params }: Props) {
	const order = await readOrder(Number(params.orderId));
	const customer = await readCustomer(order.customer_id);
	const messages = await readMessages(Number(params.orderId));
	// Die messages werden hier gefetcht. In einer server component
	// Die Messages können dann an eine Komponente weitergegeben werden.

	const breadcrumbItems = [
		{
			label: "Bestellungen",
			href: "/orders",
		},
		{
			label: String(order?.id),
			href: `/orders/${order?.id}`,
		},
	];
	// const handleFormAction = async (formData: FormData) => {
	// 	"use server";
	// 	console.log("formData", formData);
	// };
	// {/* <SingleOrderForm order={order} customer={customer} params={params} /> */}
	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<SingleOrderForm order={order} customer={customer} params={params} />
				{/* <form action={handleFormAction}>
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
							<Button
								type="submit"
								name="action"
								value="delete"
								size={"lg"}
								variant={"destructive"}
								className="max-w-[250px] justify-self-end"
							>
								Auftrag löschen
							</Button>
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
				</form> */}
				<Messages params={params} messages={messages} />
			</main>
		</>
	);
}
