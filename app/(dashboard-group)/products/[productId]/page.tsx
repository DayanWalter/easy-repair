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
import { deleteProduct, readProduct, updateProduct } from "@/features/products";
import Header from "@/components/header/header";

type Props = {
	params: {
		productId: number;
	};
};

export default async function SingleProduct({ params }: Props) {
	const product = await readProduct(params.productId);
	if (!product) {
		// Handle case where product is not found
		return <div>Product not found</div>;
	}
	const handleFormAction = async (formData: FormData) => {
		"use server";

		const action = formData.get("action");

		if (action === "update") {
			const { success, product } = await updateProduct(
				params.productId,
				formData,
			);
			if (success) {
				// TODO: Add toast, wait and redirect
				redirect("/products");
			}
			// TODO: Add error handling
		} else if (action === "delete") {
			const { success } = await deleteProduct(params.productId);
			if (success) {
				// TODO: Add toast, wait and redirect
				redirect("/products");
			}
			// TODO: Add error handling
		}
	};
	const breadcrumbItems = [
		{
			label: "Produkte",
			href: "/products",
		},
		{
			label: product?.name || "",
			href: `/products/${product?.id}`,
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
											defaultValue={product?.description}
										/>

										<Label htmlFor="price">Preis</Label>
										<Input
											type="number"
											id="price"
											step="0.01"
											name="price"
											placeholder="Preis des Produkts"
											defaultValue={product?.price}
										/>

										<Label htmlFor="category">Kategorie</Label>
										<Input
											type="text"
											id="category"
											name="category"
											placeholder="Kategorie des Produkts"
											defaultValue={product?.category}
										/>

										<Label htmlFor="stock">Lagerbestand</Label>
										<Input
											type="number"
											id="stock"
											step="1"
											name="stock"
											placeholder="Lagerbestand des Produkts"
											defaultValue={product?.stock}
										/>

										<Label htmlFor="sku">SKU</Label>
										<Input
											type="text"
											id="sku"
											name="sku"
											placeholder="SKU des Produkts"
											defaultValue={product?.sku}
										/>

										<Label htmlFor="manufacturer">Hersteller</Label>
										<Input
											type="text"
											id="manufacturer"
											name="manufacturer"
											placeholder="Hersteller des Produkts"
											defaultValue={product?.manufacturer}
										/>

										<Label htmlFor="image">Bild-URL</Label>
										<Input
											type="text"
											id="image"
											name="image"
											placeholder="https://example.com/image.jpg"
											defaultValue={product?.image}
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
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
