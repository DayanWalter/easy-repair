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
import { createCustomer } from "@/features/customers/";
import Header from "@/components/header/header";

export default function NewCustomer() {
	const breadcrumbItems = [
		{ href: "/customers", label: "Kunden" },
		{ href: "/customers/newcustomer", label: "Neuer Kunde" },
	];
	const handleCreateCustomer = async (formData: FormData) => {
		"use server";
		const { success } = await createCustomer(formData);
		if (success) {
			redirect("/customers");
		}
	};

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-2">
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<form action={handleCreateCustomer}>
								<CardHeader className="pb-3">
									<CardTitle>Kunde</CardTitle>
									<CardDescription className="max-w-lg text-balance leading-relaxed">
										{/* Id: {customerId} */}
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
										/>

										<Label htmlFor="phone">Telefon</Label>
										<Input
											type="text"
											id="phone"
											name="phone"
											placeholder="Telefonnummer des Kunden"
										/>

										<Label htmlFor="adress">Adresse</Label>
										<Input
											type="text"
											id="adress"
											name="adress"
											placeholder="Straße und Hausnummer des Kunden"
										/>

										<Label htmlFor="email">Email</Label>
										<Input
											type="email"
											id="email"
											name="email"
											placeholder="Email des Kunden"
										/>
									</div>
								</CardContent>
								<CardFooter>
									<Button type="submit">Kunden erstellen</Button>
								</CardFooter>
							</form>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
