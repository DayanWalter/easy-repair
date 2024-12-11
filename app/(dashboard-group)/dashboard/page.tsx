import {
	ChevronRight,
	ChevronLeft,
	Copy,
	CreditCard,
	File,
	ListFilter,
	MoreVertical,
	Truck,
} from "lucide-react";

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
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Progress } from "@/components/ui/progress";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from "@/components/header/header";
import Link from "next/link";
import { OrderTable } from "@/features/orders/components";
import readOrders from "@/features/orders/api/readOrders";
import { calculateCosts } from "@/features/dashboard/utils/dateCalculations";
import { filterOrdersByPeriod } from "@/features/dashboard/utils/filterOrdersByPeriod";
import { Separator } from "@/components/ui/separator";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import OrderNavigation from "@/features/dashboard/components/order-navigation";
import OrderTableWithTabs from "@/features/dashboard/components/order-table-with-tabs";
import type { CostMetrics } from "@/features/dashboard/dashboard.types";

export default async function Dashboard() {
	const breadcrumbItems = [{ href: "/dashboard", label: "Dashboard" }];
	const orders: Database["public"]["Tables"]["orders"]["Row"][] =
		await readOrders();

	const costs: CostMetrics = calculateCosts(orders);

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
						<Card className="sm:col-span-2">
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

						<Card>
							<CardHeader className="pb-2">
								<CardDescription>This Week</CardDescription>
								<CardTitle className="text-4xl">
									{costs.thisWeek.toFixed(2)}€
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-xs text-muted-foreground">
									{costs.weeklyChange > 0 && "+"}
									{costs.weeklyChange.toFixed(1)}% im Vergleich zur Vorwoche
								</div>
							</CardContent>
							<CardFooter>
								<Progress
									value={costs.weeklyChange}
									aria-label={`${costs.weeklyChange.toFixed(1)}% Veränderung`}
								/>
							</CardFooter>
						</Card>
						<Card x-chunk="dashboard-05-chunk-2">
							<CardHeader className="pb-2">
								<CardDescription>This Month</CardDescription>
								<CardTitle className="text-4xl">
									{costs.thisMonth.toFixed(2)}€
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-xs text-muted-foreground">
									{costs.monthlyChange > 0 && "+"}
									{costs.monthlyChange.toFixed(1)}% im Vergleich zum Vormonat
								</div>
							</CardContent>
							<CardFooter>
								<Progress
									value={costs.monthlyChange}
									aria-label={`${costs.monthlyChange.toFixed(1)}% Veränderung`}
								/>
							</CardFooter>
						</Card>
					</div>
					<OrderTableWithTabs orders={orders} costs={costs} />
				</div>
				<OrderNavigation orders={orders} />

				{/* <div>
					<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
						<CardHeader className="flex flex-row items-start bg-muted/50">
							<div className="grid gap-0.5">
								<CardTitle className="group flex items-center gap-2 text-lg">
									Order Oe31b70H
									<Button
										size="icon"
										variant="outline"
										className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
									>
										<Copy className="h-3 w-3" />
										<span className="sr-only">Copy Order ID</span>
									</Button>
								</CardTitle>
								<CardDescription>Date: November 23, 2023</CardDescription>
							</div>
							<div className="ml-auto flex items-center gap-1">
								<Button size="sm" variant="outline" className="h-8 gap-1">
									<Truck className="h-3.5 w-3.5" />
									<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
										Track Order
									</span>
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="icon" variant="outline" className="h-8 w-8">
											<MoreVertical className="h-3.5 w-3.5" />
											<span className="sr-only">More</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Export</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>Trash</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</CardHeader>
						<CardContent className="p-6 text-sm">
							<div className="grid gap-3">
								<div className="font-semibold">Order Details</div>
								<ul className="grid gap-3">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Glimmer Lamps x <span>2</span>
										</span>
										<span>$250.00</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">
											Aqua Filters x <span>1</span>
										</span>
										<span>$49.00</span>
									</li>
								</ul>
								<Separator className="my-2" />
								<ul className="grid gap-3">
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">Subtotal</span>
										<span>$299.00</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">Shipping</span>
										<span>$5.00</span>
									</li>
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">Tax</span>
										<span>$25.00</span>
									</li>
									<li className="flex items-center justify-between font-semibold">
										<span className="text-muted-foreground">Total</span>
										<span>$329.00</span>
									</li>
								</ul>
							</div>
							<Separator className="my-4" />
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-3">
									<div className="font-semibold">Shipping Information</div>
									<address className="grid gap-0.5 not-italic text-muted-foreground">
										<span>Liam Johnson</span>
										<span>1234 Main St.</span>
										<span>Anytown, CA 12345</span>
									</address>
								</div>
								<div className="grid auto-rows-max gap-3">
									<div className="font-semibold">Billing Information</div>
									<div className="text-muted-foreground">
										Same as shipping address
									</div>
								</div>
							</div>
							<Separator className="my-4" />
							<div className="grid gap-3">
								<div className="font-semibold">Customer Information</div>
								<dl className="grid gap-3">
									<div className="flex items-center justify-between">
										<dt className="text-muted-foreground">Customer</dt>
										<dd>Liam Johnson</dd>
									</div>
									<div className="flex items-center justify-between">
										<dt className="text-muted-foreground">Email</dt>
										<dd>
											<a href="mailto:">liam@acme.com</a>
										</dd>
									</div>
									<div className="flex items-center justify-between">
										<dt className="text-muted-foreground">Phone</dt>
										<dd>
											<a href="tel:">+1 234 567 890</a>
										</dd>
									</div>
								</dl>
							</div>
							<Separator className="my-4" />
							<div className="grid gap-3">
								<div className="font-semibold">Payment Information</div>
								<dl className="grid gap-3">
									<div className="flex items-center justify-between">
										<dt className="flex items-center gap-1 text-muted-foreground">
											<CreditCard className="h-4 w-4" />
											Visa
										</dt>
										<dd>**** **** **** 4532</dd>
									</div>
								</dl>
							</div>
						</CardContent>
						<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
							<div className="text-xs text-muted-foreground">
								Updated <time dateTime="2023-11-23">November 23, 2023</time>
							</div>
							<Pagination className="ml-auto mr-0 w-auto">
								<PaginationContent>
									<PaginationItem>
										<Button size="icon" variant="outline" className="h-6 w-6">
											<ChevronLeft className="h-3.5 w-3.5" />
											<span className="sr-only">Previous Order</span>
										</Button>
									</PaginationItem>
									<PaginationItem>
										<Button size="icon" variant="outline" className="h-6 w-6">
											<ChevronRight className="h-3.5 w-3.5" />
											<span className="sr-only">Next Order</span>
										</Button>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</CardFooter>
					</Card>
				</div> */}
			</main>
		</>
	);
}
