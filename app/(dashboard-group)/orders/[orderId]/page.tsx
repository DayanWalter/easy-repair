import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";

import OrderMessages from "@/features/orders/components/single/order-messages";
import Header from "@/components/header/header";
import OrderCustomer from "@/features/orders/components/single/order-customer";
import OrderNumber from "@/features/orders/components/single/order-number";
import OrderStatus from "@/features/orders/components/single/order-status";
import OrderAccess from "@/features/orders/components/single/order-access";
import OrderArticle from "@/features/orders/components/single/order-article";
import OrderDate from "@/features/orders/components/single/order-date";
import OrderErrorDescription from "@/features/orders/components/single/order-error-description";
import OrderDiagnose from "@/features/orders/components/single/order-diagnose";
import OrderOffer from "@/features/orders/components/single/order-offer";
import OrderRepair from "@/features/orders/components/single/order-repair";
import OrderComment from "@/features/orders/components/single/order-comment";
import OrderEmployee from "@/features/orders/components/single/order-employee";
import OrderTime from "@/features/orders/components/single/order-time";
import OrderCosts from "@/features/orders/components/single/order-costs";

import {
	readCustomer,
	readOrder,
	readOrderMessages,
} from "@/features/orders/api/read";
import { updateOrder } from "@/features/orders/api/update";
import { deleteOrder } from "@/features/orders/api/delete";
import { Card } from "@/components/ui/card";
import { createOrderMessage } from "@/features/orders/api/create";

type Props = {
	params: {
		orderId: string;
	};
};

export default async function SingleOrder({ params }: Props) {
	// TODO: Add error handling
	const order = await readOrder(Number(params.orderId));
	const customer = await readCustomer(order.customer_id);
	const messages = await readOrderMessages(Number(params.orderId));

	const handleFormAction = async (formData: FormData) => {
		"use server";
		console.log(formData);
		const action = formData.get("action");

		if (action === "update") {
			const { success } = await updateOrder(params.orderId, formData);
			if (success) {
				// TODO: Add toast, wait and redirect
				redirect("/orders");
			}
			// TODO: Add error handling
		}
		if (action === "delete") {
			const { success } = await deleteOrder(params.orderId);
			if (success) {
				// TODO: Add toast, wait and redirect
				redirect("/orders");
			}
			// TODO: Add error handling
		}
		// if (action === "createMessage") {
		// 	const { success } = await createOrderMessage(formData);
		// 	if (success) {
		// 		// TODO: Add toast, wait and redirect
		// 		redirect(`/orders/${params.orderId}`);
		// 	}
		// 	// TODO: Add error handling
		// }
	};

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
				<form action={handleFormAction}>
					<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
							{/* Kunde */}
							<Card>
								<OrderCustomer customer={customer} />
							</Card>
							{/* Auftragsnummer */}
							<Card>
								<OrderNumber order={order} />
							</Card>
							{/* Status */}
							<Card>
								<OrderStatus order={order} />
							</Card>
							{/* Kommunikation */}
							<Card className="h-72 overflow-auto xl:col-span-2 ">
								<OrderMessages messages={messages} orderId={order.id} />
							</Card>
							{/* Zugänge */}
							<Card>
								<OrderAccess order={order} />
							</Card>
							{/* Artikel */}
							<Card className="xl:col-span-3">
								<OrderArticle order={order} />
							</Card>
							{/* Datum */}
							<Card>
								<OrderDate order={order} />
							</Card>
							{/* Fehlerbeschreibung */}
							<Card>
								<OrderErrorDescription order={order} />
							</Card>
							{/* Diagnose */}
							<Card>
								<OrderDiagnose order={order} />
							</Card>
							{/* Angebot */}
							<Card>
								<OrderOffer order={order} />
							</Card>
							{/* Reparatur */}
							<Card>
								<OrderRepair order={order} />
							</Card>
							{/* Anmerkungen */}
							<Card>
								<OrderComment order={order} />
							</Card>
							{/* Mitarbeiter */}
							<Card>
								<OrderEmployee order={order} />
							</Card>
							{/* Zeit */}
							<Card>
								<OrderTime order={order} />
							</Card>
							{/* Lohnkosten */}
							{/* Materialkosten */}
							{/* Gesamtkosten */}
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
				</form>
			</main>
		</>
	);
}
