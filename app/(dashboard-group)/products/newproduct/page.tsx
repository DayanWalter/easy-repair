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
import { createProduct } from "@/features/products";
import Header from "@/components/header/header";

export default function NewProduct() {
	const breadcrumbItems = [
		{ href: "/products", label: "Produkte" },
		{ href: "/products/newproduct", label: "Neues Produkt" },
	];

	const handleCreateProduct = async (formData: FormData) => {
		"use server";
		const { success } = await createProduct(formData);
		if (success) {
			redirect("/products");
		}
	};
	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-2">
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<form action={handleCreateProduct}>
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
							</form>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
