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
import CustomerTableExport from "@/features/customers/components/page/customer-table-export";

export default async function Customers() {
	const breadcrumbItems = [{ href: "/customers", label: "Kunden" }];

	const customers: Database["public"]["Tables"]["customers"]["Row"][] =
		await readCustomers();

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />

			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-4">
						<Card x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Ihre Kunden</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Hier finden Sie eine umfassende Übersicht Ihrer Kundendaten.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href="/customers/newcustomer">
									<Button>Kunde erstellen</Button>
									<span className="sr-only">Kunde erstellen</span>
								</Link>
							</CardFooter>
						</Card>
					</div>
					<CustomerTableExport customers={customers} />
				</div>
			</main>
		</>
	);
}
