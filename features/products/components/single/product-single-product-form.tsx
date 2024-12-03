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
import updateProduct from "../../api/updateProduct";
import { redirect, useRouter } from "next/navigation";
import deleteProduct from "../../api/deleteProduct";
import { useToast } from "@/hooks/use-toast";
import convertFormDataForProduct from "../../utils/convertFormDataForProduct";
import { z } from "zod";
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
export default function SingleProductForm({
	product,
	params,
}: {
	product: Database["public"]["Tables"]["products"]["Row"];
	params: { productId: string };
}) {
	const { toast } = useToast();
	const router = useRouter();

	const handleFormAction = async (formData: FormData) => {
		// Convert FormData to a regular object
		const productData = convertFormDataForProduct(formData);
		// Validate the data with Zod
		const result = productSchema.safeParse(productData);
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
		const action = formData.get("action");

		if (action === "update") {
			const { success } = await updateProduct(params.productId, formData);
			if (success) {
				toast({
					title: "Produkt erfolgreich aktualisiert",
					description: "Produkt wurde erfolgreich aktualisiert",
				});
				router.push("/products");
				router.refresh();
			}
		}
		if (action === "delete") {
			const { success } = await deleteProduct(params.productId);
			if (success) {
				toast({
					title: "Produkt erfolgreich gelöscht",
					description: "Produkt wurde erfolgreich gelöscht",
				});
				router.push("/products");
				router.refresh();
			}
		}
	};
	return (
		<form action={handleFormAction}>
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
						defaultValue={product?.name}
					/>

					<Label htmlFor="description">Beschreibung</Label>
					<Input
						type="text"
						id="description"
						name="description"
						placeholder="Beschreibung des Produkts"
						defaultValue={product?.description || ""}
					/>

					<Label htmlFor="price">Preis</Label>
					<Input
						type="number"
						id="price"
						step="0.01"
						name="price"
						placeholder="Preis des Produkts"
						defaultValue={product?.price || 0}
					/>

					<Label htmlFor="category">Kategorie</Label>
					<Input
						type="text"
						id="category"
						name="category"
						placeholder="Kategorie des Produkts"
						defaultValue={product?.category || ""}
					/>

					<Label htmlFor="stock">Lagerbestand</Label>
					<Input
						type="number"
						id="stock"
						step="1"
						name="stock"
						placeholder="Lagerbestand des Produkts"
						defaultValue={product?.stock || 0}
					/>

					<Label htmlFor="sku">SKU</Label>
					<Input
						type="text"
						id="sku"
						name="sku"
						placeholder="SKU des Produkts"
						defaultValue={product?.sku || ""}
					/>

					<Label htmlFor="manufacturer">Hersteller</Label>
					<Input
						type="text"
						id="manufacturer"
						name="manufacturer"
						placeholder="Hersteller des Produkts"
						defaultValue={product?.manufacturer || ""}
					/>

					<Label htmlFor="image">Bild-URL</Label>
					<Input
						type="text"
						id="image"
						name="image"
						placeholder="https://example.com/image.jpg"
						defaultValue={product?.image || ""}
					/>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button type="submit" name="action" value="update">
					Produkt aktualisieren
				</Button>
				<Button
					type="submit"
					name="action"
					value="delete"
					variant="destructive"
				>
					Produkt löschen
				</Button>
			</CardFooter>
		</form>
	);
}
