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
import SingleProductForm from "@/features/products/components/single/product-single-product-form";

type Props = {
	params: {
		productId: string;
	};
};

export default async function SingleProduct({ params }: Props) {
	const product = await readProduct(params.productId);
	if (!product) {
		// Handle case where product is not found
		return <div>Product not found</div>;
	}

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
							<SingleProductForm product={product} params={params} />
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
