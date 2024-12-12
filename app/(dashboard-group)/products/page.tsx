import Link from "next/link";
import { File, ListFilter } from "lucide-react";

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
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import ProductTable from "@/features/products/components/product-table";
// Features
import { readProducts } from "@/features/products";
import Header from "@/components/header/header";
import ProductTableExport from "@/features/products/components/page/product-table-export";

export default async function Products() {
	const breadcrumbItems = [{ href: "/products", label: "Produkte" }];

	const products: Database["public"]["Tables"]["products"]["Row"][] =
		await readProducts();

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-4">
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Ihre Produkte</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Übersicht Ihrer Produkte. Erstellen Sie neue Produkte und
									verwalten Sie Ihren Bestand.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href="/products/newproduct">
									<Button>Produkt erstellen</Button>
									<span className="sr-only">Produkt erstellen</span>
								</Link>
							</CardFooter>
						</Card>
					</div>
					<ProductTableExport products={products} />
				</div>
			</main>
		</>
	);
}
