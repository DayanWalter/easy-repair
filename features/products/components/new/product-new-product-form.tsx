"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import createProduct from "../../api/createProduct";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import convertFormDataForProduct from "../../utils/convertFormDataForProduct";
// import convertFormDataForCustomer from "../../utils/convertFormDataForCustomer";

const productSchema = z.object({
	name: z
		.string({ message: "Name ist erforderlich" })
		.min(2, "Name muss mindestens 2 Zeichen lang sein")
		.max(50, "Name darf maximal 50 Zeichen lang sein"),
	// description: z
	// 	.string({ message: "Beschreibung ist erforderlich" })
	// 	.min(5, "Beschreibung muss mindestens 5 Zeichen lang sein")
	// 	.max(500, "Beschreibung darf maximal 500 Zeichen lang sein"),
	price: z
		.number({ message: "Preis ist erforderlich" })
		.min(0, "Preis muss größer oder gleich 0 sein"),
	// category: z
	//     .string({ message: "Kategorie ist erforderlich" })
	//     .min(2, "Kategorie muss mindestens 2 Zeichen lang sein"),
	stock: z
		.number({ message: "Lagerbestand ist erforderlich" })
		.int("Lagerbestand muss eine ganze Zahl sein")
		.min(0, "Lagerbestand muss größer oder gleich 0 sein"),
	// sku: z
	//     .string({ message: "SKU ist erforderlich" })
	//     .min(2, "SKU muss mindestens 2 Zeichen lang sein"),
	// manufacturer: z
	//     .string({ message: "Hersteller ist erforderlich" })
	//     .min(2, "Hersteller muss mindestens 2 Zeichen lang sein"),
	// image: z
	//     .string({ message: "Bild-URL ist erforderlich" })
	//     .url("Ungültige URL")
	//     .optional(),
});
export default function NewProductForm() {
	const { toast } = useToast();
	const router = useRouter();

	const handleFormAction = async (formData: FormData) => {
		// Convert FormData to a regular object
		const productData = convertFormDataForProduct(formData);
		console.log(productData);
		// // Validate the data with Zod
		const result = productSchema.safeParse(productData);
		console.log(result);
		// // If Zod validation fails, show error messages
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
		// Else create the product
		const { success } = await createProduct(formData);
		if (success) {
			toast({
				title: "Produkt erfolgreich erstellt",
				description: "Produkt wurde erfolgreich erstellt",
			});
			router.push("/products");
			router.refresh();
		}
	};
	return (
		<form action={handleFormAction}>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-2">
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Produkt</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed" />
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										type="text"
										id="name"
										name="name"
										placeholder="Name des Produkts"
									/>

									<Label htmlFor="description">Beschreibung</Label>
									<Input
										type="text"
										id="description"
										name="description"
										placeholder="Beschreibung des Produkts"
									/>

									<Label htmlFor="price">Preis</Label>
									<Input
										type="number"
										id="price"
										step="0.01"
										name="price"
										placeholder="Preis des Produkts"
									/>

									<Label htmlFor="category">Kategorie</Label>
									<Input
										type="text"
										id="category"
										name="category"
										placeholder="Kategorie des Produkts"
									/>

									<Label htmlFor="stock">Lagerbestand</Label>
									<Input
										type="number"
										id="stock"
										step="1"
										name="stock"
										placeholder="Lagerbestand des Produkts"
									/>

									<Label htmlFor="sku">SKU</Label>
									<Input
										type="text"
										id="sku"
										name="sku"
										placeholder="SKU des Produkts"
									/>

									<Label htmlFor="manufacturer">Hersteller</Label>
									<Input
										type="text"
										id="manufacturer"
										name="manufacturer"
										placeholder="Hersteller des Produkts"
									/>

									<Label htmlFor="image">Bild-URL</Label>
									<Input
										type="text"
										id="image"
										name="image"
										placeholder="https://example.com/image.jpg"
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit">Produkt erstellen</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</main>
		</form>
	);
}
