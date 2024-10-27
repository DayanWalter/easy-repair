import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";

import Header from "@/components/header/header";
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

import { readOrder, updateOrder, deleteOrder } from "@/features/orders";
import { readCustomer } from "@/features/customers";

import { Card } from "@/components/ui/card";
import { Messages } from "@/features/orders/messages/components";
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

	const handleFormAction = async (formData: FormData) => {
		"use server";
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
							<Card className="xl:col-span-2 xl:row-span-2">
								<Messages params={params} />
							</Card>
							{/* Artikel */}
							<Card>
								<OrderArticle order={order} />
							</Card>
							{/* Zugänge */}
							<Card>
								<OrderAccess order={order} />
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
