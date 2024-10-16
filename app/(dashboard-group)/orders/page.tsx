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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import Avatar from "@/components/avatar/avatar";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import type { Order } from "@/types";
import { format } from "date-fns";
export default function Orders() {
	const breadcrumbItems = [{ href: "/orders", label: "Orders" }];
	const [error, setError] = useState<string | null>(null);
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const { data, error } = await supabase.from("orders").select("*");

			if (error) {
				setError(`Could not fetch orders, Reason: ${error.message}`);
				setOrders([]);
				console.log(error);
				return;
			}
			if (data) {
				setOrders(data);
				setError(null);
			}
		};
		fetchOrders();
	}, []);

	const handleDelete = async (id: number) => {
		const { data, error } = await supabase
			.from("orders")
			.delete()
			.eq("id", id)
			.select();

		if (error) {
			setError(`Could not delete order, Reason: ${error.message}`);
			return;
		}
		if (data) {
			setOrders(orders.filter((order) => Number(order.id) !== id));
		}
	};
	console.log(orders);
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
						placeholder="Search..."
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
								<CardTitle>Your Orders</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Introducing Our Dynamic Orders Dashboard for Seamless
									Management and Insightful Analysis.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href="/orders/neworder">
									<Button>Create New Order</Button>
									<span className="sr-only">Create new order</span>
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
									<CardTitle>Orders</CardTitle>
									<CardDescription>
										Recent orders from your store.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Order ID / Customer ID</TableHead>
												<TableHead className="hidden sm:table-cell">
													Device
												</TableHead>
												<TableHead className="hidden sm:table-cell">
													Status
												</TableHead>
												<TableHead className="hidden md:table-cell">
													Start Date
												</TableHead>
												<TableHead className="text-right">
													Total Price
												</TableHead>
												<TableHead className="text-right">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{error && <div>{error}</div>}
											{orders.map((order) => (
												<TableRow key={order.id}>
													<TableCell>
														<div className="font-medium">
															Order ID: {order.id}
														</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															Customer ID: {order.customer_id}
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
														{order.total_costs}€
													</TableCell>
													<TableCell className="flex justify-end gap-1">
														<Link href={`/orders/${order.id}`}>
															<Button size="sm">Edit</Button>
														</Link>
														<Button
															onClick={() => handleDelete(order.id)}
															variant="destructive"
															size="sm"
														>
															Delete
														</Button>
													</TableCell>
												</TableRow>
											))}
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
