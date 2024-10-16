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
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import Avatar from "@/components/avatar/avatar";
import { useEffect, useState } from "react";
import supabase from "@/database/supabaseClient";
import type { Product } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
	params: {
		productId: number;
	};
};

export default function SingleProduct({ params }: Props) {
	const router = useRouter();
	const [product, setProduct] = useState<Product | null>(null);
	const [error, setError] = useState<string | null>(null);

	const breadcrumbItems = [
		{
			label: "Products",
			href: "/products",
		},
		{
			label: product?.name || "",
			href: `/products/${product?.id}`,
		},
	];

	useEffect(() => {
		const fetchProduct = async () => {
			const { data, error } = await supabase
				.from("products")
				.select()
				.eq("id", params.productId)
				.single();

			if (error) {
				console.error("Error fetching product:", error);
				setError(error.message);
			}
			if (data) {
				setProduct(data);
				setError(null);
			}
		};
		fetchProduct();
	}, [params.productId]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setProduct((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleSubmit = async () => {
		const { data, error } = await supabase
			.from("products")
			.update(product)
			.eq("id", product?.id)
			.select();
		if (error) {
			console.error("Error updating product:", error);
			setError(error.message);
		}
		if (data) {
			console.log("Product updated:", data);
			setError(null);
			router.push("/products");
		}
	};

	return (
		<>
			<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
				<Breadcrumb items={breadcrumbItems} />
				<div className="relative ml-auto flex-1 md:grow-0">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					/>
				</div>
				<Avatar />
			</header>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-2">
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Product</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Id: {product?.id}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										type="text"
										id="name"
										placeholder="Product Name"
										value={product?.name}
										onChange={handleChange}
									/>

									<Label htmlFor="description">Description</Label>
									<Input
										type="text"
										id="description"
										placeholder="Product Description"
										value={product?.description}
										onChange={handleChange}
									/>

									<Label htmlFor="price">Price</Label>
									<Input
										type="text"
										id="price"
										placeholder="0.00"
										value={product?.price}
										onChange={handleChange}
									/>

									<Label htmlFor="category">Category</Label>
									<Input
										type="text"
										id="category"
										placeholder="Category"
										value={product?.category}
										onChange={handleChange}
									/>

									<Label htmlFor="stock">Stock</Label>
									<Input
										type="text"
										id="stock"
										placeholder="0"
										value={product?.stock}
										onChange={handleChange}
									/>

									<Label htmlFor="sku">SKU</Label>
									<Input
										type="text"
										id="sku"
										placeholder="SKU"
										value={product?.sku}
										onChange={handleChange}
									/>

									<Label htmlFor="manufacturer">Manufacturer</Label>
									<Input
										type="text"
										id="manufacturer"
										placeholder="Manufacturer"
										value={product?.manufacturer}
										onChange={handleChange}
									/>

									<Label htmlFor="image">Image URL</Label>
									<Input
										type="text"
										id="image"
										placeholder="https://example.com/image.jpg"
										value={product?.image}
										onChange={handleChange}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button onClick={handleSubmit}>Update Product</Button>
								{error && <p className="text-red-500">{error}</p>}
							</CardFooter>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
