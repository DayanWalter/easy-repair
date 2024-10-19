"use client";
import Link from "next/link";
import { File, ListFilter, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";

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
import { Input } from "@/components/ui/input";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";

import Avatar from "@/components/avatar/avatar";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import type { Order } from "@/types";
import { format } from "date-fns";
import SkeletonRow from "@/components/skeleton-row/skeleton-row";
import { OrderDeletePopover } from "@/components/order-delete-popover/order-delete-popover";

export default function Orders() {
	const breadcrumbItems = [{ href: "/orders", label: "Bestellungen" }];
	const [error, setError] = useState<string | null>(null);
	const [orders, setOrders] = useState<Order[]>([]);
	const [ordersLoading, setOrdersLoading] = useState<boolean>(false);

	const numSkeletons = 3;

	useEffect(() => {
		const fetchOrders = async () => {
			setOrdersLoading(true);
			const { data, error } = await supabase.from("orders").select("*");

			if (error) {
				setError(`Could not fetch orders, Reason: ${error.message}`);
				setOrders([]);
				return;
			}
			if (data) {
				setOrders(data);
				setError(null);
			}
			setOrdersLoading(false);
		};
		fetchOrders();
	}, []);

	return (
		<>
			<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
				{/* Breadcrumb */}
				<Breadcrumb items={breadcrumbItems} />
				{/* Search */}
				<div className="relative ml-auto flex-1 md:grow-0">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Suchen..."
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					/>
				</div>
				{/* Avatar and dropdown */}
				<Avatar />
			</header>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-4">
						{/* Your Orders */}
						<Card className="" x-chunk="dashboard-05-chunk-0">
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
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Auftragsnr. / Kundennr.</TableHead>
												<TableHead className="hidden sm:table-cell">
													Gerät
												</TableHead>
												<TableHead className="hidden sm:table-cell">
													Status
												</TableHead>
												<TableHead className="hidden md:table-cell">
													Startdatum
												</TableHead>
												<TableHead className="text-right">
													Gesamtbetrag{" "}
												</TableHead>
												<TableHead className="text-right">Aktionen</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{ordersLoading ? (
												<>
													{Array.from({ length: numSkeletons }).map(
														(_, index) => (
															// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key for skeleton rows
															<SkeletonRow key={`skeleton-${index}`} />
														),
													)}
												</>
											) : error ? (
												<TableRow>
													<TableCell colSpan={6}>{error}</TableCell>
												</TableRow>
											) : (
												orders.map((order) => (
													<TableRow key={order.id}>
														<TableCell>
															<div className="font-medium">
																Auftragsnr.: {order.id}
															</div>
															<div className="hidden text-sm text-muted-foreground md:inline">
																Kundennr.: {order.customer_id}
															</div>
														</TableCell>
														<TableCell className="hidden sm:table-cell">
															{order.article_device}
														</TableCell>
														<TableCell className="hidden sm:table-cell">
															<Badge
																className="text-xs"
																variant={
																	order.state === "Fulfilled"
																		? "secondary"
																		: "outline"
																}
															>
																{order.state}
															</Badge>
														</TableCell>
														<TableCell className="hidden md:table-cell">
															{order.date_start
																? format(order.date_start, "dd.MM.yyyy")
																: "N/A"}
														</TableCell>
														<TableCell className="text-right">
															{order.total_costs?.toFixed(2)} €
														</TableCell>
														<TableCell className="flex justify-end gap-1">
															<Link href={`/orders/${order.id}`}>
																<Button size="sm">Bearbeiten</Button>
															</Link>
															<OrderDeletePopover
																order={order}
																orders={orders}
																setOrders={setOrders}
															/>
														</TableCell>
													</TableRow>
												))
											)}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</>
	);
}
