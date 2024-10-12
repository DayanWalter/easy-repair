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

type Props = {
	params: {
		productId: number;
	};
};

export default function Product({ params }: Props) {
	const product = products.find(
		(p) => p.product_id === Number(params.productId),
	);
	console.log(product);
	const handleChange = () => {};
	const breadcrumbItems = [
		{
			label: "Products",
			href: "/products",
		},
		{
			label: product?.product_name || "",
			href: `/products/${product?.product_id}`,
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
						{/* Product */}
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Product</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Id: {product?.product_id}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Label htmlFor="product_name">Name</Label>
									<Input
										type="text"
										id="product_name"
										placeholder="Product Name"
										defaultValue={product?.product_name}
										onChange={handleChange}
									/>

									<Label htmlFor="product_description">Description</Label>
									<Input
										type="text"
										id="product_description"
										placeholder="Product Description"
										defaultValue={product?.product_description}
										onChange={handleChange}
									/>

									<Label htmlFor="product_price">Price</Label>
									<Input
										type="text"
										id="product_price"
										placeholder="0.00"
										defaultValue={product?.product_price}
										onChange={handleChange}
									/>

									<Label htmlFor="product_category">Category</Label>
									<Input
										type="text"
										id="product_category"
										placeholder="Category"
										defaultValue={product?.product_category}
										onChange={handleChange}
									/>

									<Label htmlFor="product_stock">Stock</Label>
									<Input
										type="text"
										id="product_stock"
										placeholder="0"
										defaultValue={product?.product_stock}
										onChange={handleChange}
									/>

									<Label htmlFor="product_sku">SKU</Label>
									<Input
										type="text"
										id="product_sku"
										placeholder="SKU"
										defaultValue={product?.product_sku}
										onChange={handleChange}
									/>

									<Label htmlFor="product_manufacturer">Manufacturer</Label>
									<Input
										type="text"
										id="product_manufacturer"
										placeholder="Manufacturer"
										defaultValue={product?.product_manufacturer}
										onChange={handleChange}
									/>

									<Label htmlFor="product_image">Image URL</Label>
									<Input
										type="text"
										id="product_image"
										placeholder="https://example.com/image.jpg"
										defaultValue={product?.product_image}
										onChange={handleChange}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Update Product</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
