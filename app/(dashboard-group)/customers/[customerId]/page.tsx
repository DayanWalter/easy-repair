import { Search } from "lucide-react";
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
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import Avatar from "@/components/avatar/avatar";

// Features
import { readCustomer } from "@/features/customers/api/read";
import { updateCustomer } from "@/features/customers/api/update";
import { deleteCustomer } from "@/features/customers/api/delete";

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
			const { success, customer } = await updateCustomer(
				params.customerId,
				formData,
			);
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
			<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
				{/* Breadcrumb */}
				<Breadcrumb items={breadcrumbItems} />

				{/* Search */}
				<div className="relative ml-auto flex-1 md:grow-0">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Suchen..."
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					/>
				</div>
				{/* Avatar and dropdown */}
				<Avatar />
			</header>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-2">
						{/* Kunde */}
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
