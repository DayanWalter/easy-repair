import Link from "next/link";
import { File, ListFilter } from "lucide-react";

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

// Features
import { readOrders } from "@/features/orders";
import OrderTable from "@/features/orders/components/order-table";
import Header from "@/components/header/header";

export default async function Orders() {
	const breadcrumbItems = [{ href: "/orders", label: "Bestellungen" }];
	const orders = await readOrders();

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-4">
						<Card>
							<CardHeader className="pb-3">
								<CardTitle>Ihre Bestellungen</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Übersicht aller Bestellungen. Prüfen Sie den Status oder
									erstellen Sie neue Aufträge.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href="/orders/neworder">
									<Button>Auftrag erstellen</Button>
									<span className="sr-only">Auftrag erstellen</span>
								</Link>
							</CardFooter>
						</Card>
					</div>
					<Tabs defaultValue="week">
						<div className="flex items-center">
							{/* <TabsList>
								<TabsTrigger value="week">Week</TabsTrigger>
								<TabsTrigger value="month">Month</TabsTrigger>
								<TabsTrigger value="year">Year</TabsTrigger>
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
						<TabsContent value="week">
							<Card x-chunk="dashboard-05-chunk-3">
								<CardHeader className="px-7">
									<CardTitle>Bestellungen</CardTitle>
									<CardDescription>
										Übersicht Ihrer erstellten Aufträge und Bestellungen.
									</CardDescription>
								</CardHeader>
								<CardContent>
									{orders && orders.length > 0 ? (
										<OrderTable orders={orders ?? []} />
									) : (
										<Card>
											<CardHeader>
												<CardTitle>Keine Bestellungen gefunden</CardTitle>
											</CardHeader>
											<CardContent>
												<p>Es wurden noch keine Bestellungen erstellt.</p>
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
