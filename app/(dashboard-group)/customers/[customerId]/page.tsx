import { redirect } from "next/navigation";

// Global Components
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Features
import {
	readCustomer,
	updateCustomer,
	deleteCustomer,
} from "@/features/customers";
import Header from "@/components/header/header";

type Props = {
	params: {
		customerId: number;
	};
};

export default async function SingleCustomer({ params }: Props) {
	const customer = await readCustomer(params.customerId);

	if (!customer) {
		// TODO: add real ui
		return <div>Customer not found</div>;
	}
	const handleFormAction = async (formData: FormData) => {
		"use server";

		const action = formData.get("action");
		if (action === "update") {
			const { success } = await updateCustomer(params.customerId, formData);
			if (success) {
				// TODO: Add toast, wait and redirect
				redirect("/customers");
			}
			// TODO: Add error handling
		} else if (action === "delete") {
			const { success } = await deleteCustomer(params.customerId);
			if (success) {
				// TODO: Add toast, wait and redirect
				redirect("/customers");
			}
			// TODO: Add error handling
		}
	};
	const breadcrumbItems = [
		{
			label: "Kunden",
			href: "/customers",
		},
		{
			label: customer?.name || "",
			href: `/customers/${customer?.id}`,
		},
	];

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-2">
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<form action={handleFormAction}>
								<CardHeader className="pb-3">
									<CardTitle>Kunde</CardTitle>
									<CardDescription className="max-w-lg text-balance leading-relaxed">
										Kundennr.: {customer?.id}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-2">
										<Label htmlFor="name">Name</Label>
										<Input
											type="text"
											id="name"
											name="name"
											placeholder="Name des Kunden"
											defaultValue={customer?.name}
										/>

										<Label htmlFor="phone">Telefon</Label>
										<Input
											type="text"
											id="phone"
											name="phone"
											placeholder="Telefonnummer des Kunden"
											defaultValue={customer?.phone}
										/>

										<Label htmlFor="adress">Adresse</Label>
										<Input
											type="text"
											id="adress"
											name="adress"
											placeholder="Adresse des Kunden"
											defaultValue={customer?.adress}
										/>

										<Label htmlFor="email">Email</Label>
										<Input
											type="email"
											id="email"
											name="email"
											placeholder="Email des Kunden"
											defaultValue={customer?.email}
										/>
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<Button type="submit" name="action" value="update">
										Kunden aktualisieren
									</Button>
									<Button
										type="submit"
										name="action"
										value="delete"
										variant="destructive"
									>
										Kunden löschen
									</Button>
								</CardFooter>
							</form>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
