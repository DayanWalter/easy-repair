// import React from "react";
// import { redirect } from "next/navigation";
// import { updateOrder, deleteOrder } from "@/features/orders";

// import {
// 	OrderCustomer,
// 	OrderNumber,
// 	OrderStatus,
// 	OrderAccess,
// 	OrderArticle,
// 	OrderDate,
// 	OrderErrorDescription,
// 	OrderDiagnose,
// 	OrderOffer,
// 	OrderRepair,
// 	OrderComment,
// 	OrderEmployee,
// 	OrderTime,
// 	OrderCosts,
// } from "@/features/orders/components/single";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import { Messages } from "@/features/messages/components";

import Header from "@/components/header/header";

import { readOrder } from "@/features/orders";
import { readCustomer } from "@/features/customers";
import SingleOrderForm from "@/features/orders/components/single/order-single-order-form";

// import { createOrderMessage } from "@/features/orders/api/create";

type Props = {
	params: {
		orderId: string;
	};
};

export default async function SingleOrder({ params }: Props) {
	// TODO: Add error handling
	const order = await readOrder(Number(params.orderId));
	const customer = await readCustomer(order.customer_id);

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

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<SingleOrderForm order={order} customer={customer} params={params} />
				{/* <form action={handleFormAction}>
					<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
							<Card>
								<OrderCustomer customer={customer} />
							</Card>
							<Card>
								<OrderNumber order={order} />
							</Card>
							<Card>
								<OrderStatus order={order} />
							</Card>
							<Card className="xl:col-span-2 xl:row-span-2">
								<Messages params={params} />
							</Card>
							<Card>
								<OrderArticle order={order} />
							</Card>
							<Card>
								<OrderAccess order={order} />
							</Card>
							<Card>
								<OrderDate order={order} />
							</Card>
							<Card>
								<OrderErrorDescription order={order} />
							</Card>
							<Card>
								<OrderDiagnose order={order} />
							</Card>
							<Card>
								<OrderOffer order={order} />
							</Card>
							<Card>
								<OrderRepair order={order} />
							</Card>
							<Card>
								<OrderComment order={order} />
							</Card>
							<Card>
								<OrderEmployee order={order} />
							</Card>
							<Card>
								<OrderTime order={order} />
							</Card>
							<OrderCosts order={order} />
						</div>
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
					</div>
				</form> */}
			</main>
		</>
	);
}
