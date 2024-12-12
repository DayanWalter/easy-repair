import React from "react";
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

import { CustomerTable, readCustomers } from "@/features/customers";

import Header from "@/components/header/header";
import ExportButton from "@/components/export-button";
import ExportCustomerButton from "./export-customer-button";
export default function CustomerTableExport({
	customers,
}: {
	customers: Database["public"]["Tables"]["customers"]["Row"][];
}) {
	return (
		<Tabs defaultValue="customers">
			<div className="flex items-center">
				<div className="ml-auto flex items-center gap-2">
					<ExportCustomerButton customers={customers} />
				</div>
			</div>

			<TabsContent value="customers">
				<Card x-chunk="dashboard-05-chunk-3">
					<CardHeader className="px-7">
						<CardTitle>Kunden</CardTitle>
						<CardDescription>Übersicht Ihrer Kunden.</CardDescription>
					</CardHeader>
					<CardContent>
						{customers && customers.length > 0 ? (
							<CustomerTable customers={customers ?? []} />
						) : (
							<Card>
								<CardHeader>
									<CardTitle>Keine Kunden gefunden</CardTitle>
								</CardHeader>
								<CardContent>
									<p>Es wurden noch keine Kunden erstellt.</p>
								</CardContent>
							</Card>
						)}
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
