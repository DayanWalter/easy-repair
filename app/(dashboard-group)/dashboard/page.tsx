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
				{/* Keep this here */}
				{/* grid gap-3 */}
				{/* ml-auto mr-0 w-auto */}
			</main>
		</>
	);
}
