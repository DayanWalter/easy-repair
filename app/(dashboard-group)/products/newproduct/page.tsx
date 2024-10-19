"use client";

import { Search } from "lucide-react";

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

import { products } from "@/database/products";
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import Avatar from "@/components/avatar/avatar";
import { useState } from "react";
import supabase from "@/database/supabaseClient";
import type { Product } from "@/types";
import { useRouter } from "next/navigation";

export default function NewProduct() {
	const router = useRouter();
	const initialProductState: Product = {
		name: undefined,
		description: undefined,
		price: undefined,
		category: undefined,
		stock: undefined,
		sku: undefined,
		manufacturer: undefined,
		image: undefined,
		updated_at: new Date(),
	};
	const breadcrumbItems = [
		{ href: "/products", label: "Produkte" },
		{ href: "/products/newproduct", label: "Neues Produkt" },
	];
	const [newProduct, setNewProduct] = useState(initialProductState);
	//TODO: use error state
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setNewProduct((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleCreateProduct = async () => {
		console.log("Product created:", newProduct);
		const { error, data } = await supabase
			.from("products")
			.insert([
				{
					...newProduct,
				},
			])
			.select();

		if (error) {
			console.error("Error creating product:", error);
			setError(`Could not create product, Reason: ${error.message}`);
		}
		if (data) {
			console.log("Product created:", data);
			setError(null);
			setNewProduct(initialProductState);
			router.push("/products");
			// TODO: Show toast
		}
	};
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
						placeholder="Search..."
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
							<CardHeader className="pb-3">
								<CardTitle>Produkt</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									{/* Id: {productId} */}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										type="text"
										id="name"
										placeholder="Name des Produkts"
										value={newProduct.name}
										onChange={handleChange}
									/>

									<Label htmlFor="description">Beschreibung</Label>
									<Input
										type="text"
										id="description"
										placeholder="Beschreibung des Produkts"
										value={newProduct.description}
										onChange={handleChange}
									/>

									<Label htmlFor="price">Preis</Label>
									<Input
										type="number"
										step="0.01"
										id="price"
										placeholder="Preis des Produkts"
										value={newProduct.price}
										onChange={handleChange}
									/>

									<Label htmlFor="category">Kategorie</Label>
									<Input
										type="text"
										id="category"
										placeholder="Kategorie des Produkts"
										value={newProduct.category}
										onChange={handleChange}
									/>

									<Label htmlFor="stock">Lagerbestand</Label>
									<Input
										type="number"
										step="1"
										id="stock"
										placeholder="Lagerbestand des Produkts"
										value={newProduct.stock}
										onChange={handleChange}
									/>

									<Label htmlFor="sku">SKU</Label>
									<Input
										type="text"
										id="sku"
										placeholder="SKU des Produkts"
										value={newProduct.sku}
										onChange={handleChange}
									/>

									<Label htmlFor="manufacturer">Hersteller</Label>
									<Input
										type="text"
										id="manufacturer"
										placeholder="Hersteller des Produkts"
										value={newProduct.manufacturer}
										onChange={handleChange}
									/>

									<Label htmlFor="image">Bild-URL</Label>
									<Input
										type="text"
										id="image"
										placeholder="https://example.com/image.jpg"
										value={newProduct.image}
										onChange={handleChange}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button onClick={handleCreateProduct}>Produkt erstellen</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
