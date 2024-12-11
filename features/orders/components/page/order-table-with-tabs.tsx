"use client";

import React, { useState } from "react";
import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrderTable } from "@/features/orders/components";
import { filterOrdersByPeriod } from "@/features/dashboard/utils/filterOrdersByPeriod";
import {
	filterOrdersByState,
	type FilterState,
} from "@/features/dashboard/utils/filterOrderByState";

import OrderExportButton from "@/features/dashboard/components/order-export-button";

export default function OrderTableWithTabs({
	orders,
}: {
	orders: Database["public"]["Tables"]["orders"]["Row"][];
}) {
	const [currentTab, setCurrentTab] = useState<"week" | "month" | "year">(
		"week",
	);
	const [filters, setFilters] = useState<FilterState>({
		offen: true,
		inBearbeitung: true,
		erledigt: true,
		abgerechnet: true,
	});

	const getFilteredOrders = (period: "week" | "month" | "year") => {
		const ordersByPeriod = filterOrdersByPeriod(orders, period);
		return filterOrdersByState(ordersByPeriod, filters);
	};

	return (
		<Tabs
			defaultValue="week"
			onValueChange={(value) =>
				setCurrentTab(value as "week" | "month" | "year")
			}
		>
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="week">Week</TabsTrigger>
					<TabsTrigger value="month">Month</TabsTrigger>
					<TabsTrigger value="year">Year</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
								<ListFilter className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only">Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem
								checked={filters.offen}
								onCheckedChange={(checked) =>
									setFilters((prev) => ({ ...prev, offen: checked }))
								}
							>
								Offen
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								checked={filters.inBearbeitung}
								onCheckedChange={(checked) =>
									setFilters((prev) => ({ ...prev, inBearbeitung: checked }))
								}
							>
								In Bearbeitung
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								checked={filters.erledigt}
								onCheckedChange={(checked) =>
									setFilters((prev) => ({ ...prev, erledigt: checked }))
								}
							>
								Erledigt
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								checked={filters.abgerechnet}
								onCheckedChange={(checked) =>
									setFilters((prev) => ({ ...prev, abgerechnet: checked }))
								}
							>
								Abgerechnet
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<OrderExportButton orders={getFilteredOrders(currentTab)} />
				</div>
			</div>
			<TabsContent value="week">
				<Card>
					<CardHeader>
						<CardTitle>Bestellungen dieser Woche</CardTitle>
						<CardDescription>Gesamtumsatz:</CardDescription>
					</CardHeader>
					<CardContent>
						<OrderTable orders={getFilteredOrders("week")} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="month">
				<Card>
					<CardHeader>
						<CardTitle>Bestellungen dieses Monats</CardTitle>
						<CardDescription>Gesamtumsatz:</CardDescription>
					</CardHeader>
					<CardContent>
						<OrderTable orders={getFilteredOrders("month")} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="year">
				<Card>
					<CardHeader>
						<CardTitle>Bestellungen dieses Jahres</CardTitle>
						<CardDescription>Gesamtumsatz:</CardDescription>
					</CardHeader>
					<CardContent>
						<OrderTable orders={getFilteredOrders("year")} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
