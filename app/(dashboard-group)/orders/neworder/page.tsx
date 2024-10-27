import { redirect } from "next/navigation";

// Global Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Features
import { createOrder } from "@/features/orders";
import {
	OrderFindCustomer,
	OrderNumber,
	OrderStatus,
	OrderMessages,
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
} from "@/features/orders/components/new";

import Header from "@/components/header/header";

export default function NewOrder() {
	const breadcrumbItems = [
		{ href: "/orders", label: "Bestellungen" },
		{ href: "/orders/neworder", label: "Neue Bestellung" },
	];
	const handleCreateOrder = async (formData: FormData) => {
		"use server";

		const { success } = await createOrder(formData);
		if (success) {
			redirect("/orders");
		}
	};
	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<form action={handleCreateOrder}>
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 ">
						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 ">
							{/* Kunde */}
							<Card>
								<OrderFindCustomer />
							</Card>
							{/* Auftragsnummer */}
							<Card>
								<OrderNumber />
							</Card>
							{/* Status */}
							<Card>
								<OrderStatus />
							</Card>
							{/* Kommunikation */}
							<Card className="xl:col-span-2">
								<OrderMessages />
							</Card>
							{/* Zugänge */}
							<Card>
								<OrderAccess />
							</Card>
							{/* Artikel */}
							<Card className="xl:col-span-3">
								<OrderArticle />
							</Card>
							{/* Datum */}
							<Card>
								<OrderDate />
							</Card>
							{/* Fehlerbeschreibung */}
							<Card>
								<OrderErrorDescription />
							</Card>
							{/* Diagnose */}
							<Card>
								<OrderDiagnose />
							</Card>
							{/* Angebot */}
							<Card>
								<OrderOffer />
							</Card>
							{/* Reparatur */}
							<Card>
								<OrderRepair />
							</Card>
							{/* Anmerkungen */}
							<Card>
								<OrderComment />
							</Card>
							{/* Mitarbeiter */}
							<Card>
								<OrderEmployee />
							</Card>
							{/* Zeit */}
							<Card>
								<OrderTime />
							</Card>
							{/* Lohnkosten */}
							{/* Materialkosten */}
							{/* Gesamtkosten */}
							<OrderCosts />
						</div>
						<Button
							type="submit"
							size={"lg"}
							variant="default"
							className="max-w-[250px] justify-self-end"
						>
							Auftrag erstellen
						</Button>
					</div>
				</main>
			</form>
		</>
	);
}
