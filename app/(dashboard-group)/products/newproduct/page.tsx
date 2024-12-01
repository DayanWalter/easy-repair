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
import NewProductForm from "@/features/products/components/new/product-new-product-form";

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
			<NewProductForm />
		</>
	);
}
