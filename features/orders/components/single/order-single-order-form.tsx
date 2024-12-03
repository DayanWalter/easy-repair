"use client";
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

import { Messages } from "@/features/messages/components";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import convertFormDataForOrder from "../../utils/convertFormDataForOrder";

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
			const { success } = await updateOrder(params.orderId, formData);
			if (success) {
				toast({
					title: "Auftrag erfolgreich aktualisiert",
					description: "Auftrag wurde erfolgreich aktualisiert",
				});
				router.push("/orders");
				router.refresh();
			}
		}
		// ...or delete the order
		if (action === "delete") {
			const { success } = await deleteOrder(params.orderId);
			if (success) {
				toast({
					title: "Auftrag erfolgreich gelöscht",
					description: "Auftrag wurde erfolgreich gelöscht",
				});
				router.push("/orders");
				router.refresh();
			}
		}
	};
	return (
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
	);
}
