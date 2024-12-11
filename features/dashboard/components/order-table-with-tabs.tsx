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

import OrderExportButton from "@/features/dashboard/components/order-export-button";
import type { CostMetrics } from "../dashboard.types";

export default function OrderTableWithTabs({
	orders,
	costs,
}: {
	orders: Database["public"]["Tables"]["orders"]["Row"][];
	costs: CostMetrics;
}) {
	const [currentTab, setCurrentTab] = useState<"week" | "month" | "year">(
		"week",
	);
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
							<DropdownMenuCheckboxItem checked>
								Fulfilled
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<OrderExportButton orders={orders} period={currentTab} />
				</div>
			</div>
			<TabsContent value="week">
				<Card>
					<CardHeader>
						<CardTitle>Bestellungen dieser Woche</CardTitle>
						<CardDescription>
							Gesamtumsatz: {costs.thisWeek.toFixed(2)}€
						</CardDescription>
					</CardHeader>
					<CardContent>
						<OrderTable orders={filterOrdersByPeriod(orders, "week")} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="month">
				<Card>
					<CardHeader>
						<CardTitle>Bestellungen dieses Monats</CardTitle>
						<CardDescription>
							Gesamtumsatz: {costs.thisMonth.toFixed(2)}€
						</CardDescription>
					</CardHeader>
					<CardContent>
						<OrderTable orders={filterOrdersByPeriod(orders, "month")} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="year">
				<Card>
					<CardHeader>
						<CardTitle>Bestellungen dieses Jahres</CardTitle>
						<CardDescription>
							Gesamtumsatz: {costs.thisYear.toFixed(2)}€
						</CardDescription>
					</CardHeader>
					<CardContent>
						<OrderTable orders={filterOrdersByPeriod(orders, "year")} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
