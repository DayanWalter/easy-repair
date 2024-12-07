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

export default async function Products() {
	const breadcrumbItems = [{ href: "/products", label: "Produkte" }];

	const products = await readProducts();

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
					<Tabs defaultValue="products">
						<div className="flex items-center">
							{/* <TabsList>
								<TabsTrigger value="products">Products</TabsTrigger>
								<TabsTrigger value="services">Services</TabsTrigger>
							</TabsList> */}
							<div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="h-7 gap-1 text-sm"
										>
											<ListFilter className="h-3.5 w-3.5" />
											<span className="sr-only sm:not-sr-only">Filter</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Filter by</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem checked>
											Fulfilled
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Declined
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Refunded
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Button
									size="sm"
									variant="outline"
									className="h-7 gap-1 text-sm"
								>
									<File className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only">Export</span>
								</Button>
							</div>
						</div>
						{/* Table */}
						<TabsContent value="products">
							<Card x-chunk="dashboard-05-chunk-3">
								<CardHeader className="px-7">
									<CardTitle>Produkte</CardTitle>
									<CardDescription>
										Ihr Produktkatalog auf einen Blick. Einfaches Hinzufügen,
										Bearbeiten und Organisieren Ihrer Artikel.
									</CardDescription>
								</CardHeader>
								<CardContent>
									{products && products.length > 0 ? (
										<ProductTable products={products ?? []} />
									) : (
										<Card>
											<CardHeader>
												<CardTitle>Keine Produkte gefunden</CardTitle>
											</CardHeader>
											<CardContent>
												<p>Es wurden noch keine Produkte erstellt.</p>
											</CardContent>
										</Card>
									)}
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</>
	);
}
