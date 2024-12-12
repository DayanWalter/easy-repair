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

import { Tabs, TabsContent } from "@/components/ui/tabs";

import OrderTable from "@/components/order-table";
import {
	filterOrdersByState,
	type FilterState,
} from "@/utils/filterOrderByState";

import ExportButton from "@/components/export-button";

export default function OrderTableFilterExport({
	orders,
}: {
	orders: Database["public"]["Tables"]["orders"]["Row"][];
}) {
	const [filters, setFilters] = useState<FilterState>({
		offen: true,
		inBearbeitung: true,
		erledigt: true,
		abgerechnet: true,
	});

	return (
		<>
			<Tabs defaultValue="orders">
				<div className="flex items-center">
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
						<ExportButton orders={filterOrdersByState(orders, filters)} />
					</div>
				</div>
				<TabsContent value="orders">
					<Card>
						<CardHeader>
							<CardTitle>Bestellungen</CardTitle>
							<CardDescription>Übersicht Ihrer Bestellungen.</CardDescription>
						</CardHeader>
						<CardContent>
							<OrderTable orders={filterOrdersByState(orders, filters)} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
