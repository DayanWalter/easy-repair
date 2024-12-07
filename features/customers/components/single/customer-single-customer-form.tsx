"use client";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import updateCustomer from "../../api/updateCustomer";
import { redirect, useRouter } from "next/navigation";
import deleteCustomer from "../../api/deleteCustomer";
import convertFormDataForCustomer from "../../utils/convertFormDataForCustomer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
const customerSchema = z.object({
	name: z
		.string({ message: "Name ist erforderlich" })
		.min(2, "Name muss mindestens 2 Zeichen lang sein")
		.max(50, "Name darf maximal 50 Zeichen lang sein"),
	// adress: z
	// 	.string({ message: "Adresse ist erforderlich" })
	// 	.min(5, "Adresse muss mindestens 5 Zeichen lang sein")
	// 	.max(100, "Adresse darf maximal 100 Zeichen lang sein"),
	// phone: z
	// 	.string({ message: "Telefonnummer ist erforderlich" })
	// 	.min(5, "Telefonnummer muss mindestens 5 Zeichen lang sein")
	// 	.max(20, "Telefonnummer darf maximal 20 Zeichen lang sein")
	// 	.optional(),
	// email: z
	// 	.string({ message: "E-Mail ist erforderlich" })
	// 	.email("Ungültige E-Mail-Adresse")
	// 	.optional(),
});
export default function SingleCustomerForm({
	customer,
	params,
}: {
	customer: Database["public"]["Tables"]["customers"]["Row"];
	params: { customerId: string };
}) {
	const { toast } = useToast();
	const router = useRouter();
	const handleFormAction = async (formData: FormData) => {
		// Convert FormData to a regular object
		const customerData = convertFormDataForCustomer(formData);
		// Validate the data with Zod
		const result = customerSchema.safeParse(customerData);
		// If Zod validation fails, show error messages
		if (!result.success) {
			for (const issue of result.error.issues) {
				toast({
					variant: "destructive",
					title: "Validierungsfehler",
					description: issue.message,
				});
			}
		}
		const action = formData.get("action");
		if (action === "update") {
			const { data, error } = await updateCustomer(params.customerId, formData);
			if (data && data.length > 0) {
				toast({
					title: "Kunde aktualisiert",
					description: "Kunde wurde erfolgreich aktualisiert",
				});
				router.push("/customers");
				router.refresh();
			}
			if ((data && data.length === 0) || error) {
				toast({
					variant: "destructive",
					title: "Kunde nicht aktualisiert",
					description: "Fehler beim Aktualisieren des Kunden",
				});
			}
		} else if (action === "delete") {
			const { data, error } = await deleteCustomer(params.customerId);
			if (data && data.length > 0) {
				toast({
					title: "Kunde erfolgreich gelöscht",
					description: "Kunde wurde erfolgreich gelöscht",
				});
				router.push("/customers");
				router.refresh();
			}
			if ((data && data.length === 0) || error) {
				toast({
					variant: "destructive",
					title: "Kunde nicht gelöscht",
					description: "Fehler beim Löschen des Kunden",
				});
			}
		}
	};
	return (
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
						defaultValue={customer?.name || ""}
					/>

					<Label htmlFor="phone">Telefon</Label>
					<Input
						type="text"
						id="phone"
						name="phone"
						placeholder="Telefonnummer des Kunden"
						defaultValue={customer?.phone || ""}
					/>

					<Label htmlFor="adress">Adresse</Label>
					<Input
						type="text"
						id="adress"
						name="adress"
						placeholder="Adresse des Kunden"
						defaultValue={customer?.adress || ""}
					/>

					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						placeholder="Email des Kunden"
						defaultValue={customer?.email || ""}
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
	);
}
