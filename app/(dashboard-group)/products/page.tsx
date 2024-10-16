"use client";
import Link from "next/link";
import { File, ListFilter, Search } from "lucide-react";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import type { Product } from "@/types";
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

export default function Products() {
	const breadcrumbItems = [{ href: "/products", label: "Products" }];

	const [error, setError] = useState<string | null>(null);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data, error } = await supabase.from("products").select("*");

			if (error) {
				setError(`Could not fetch products, Reason: ${error.message}`);
				setProducts([]);
				console.log(error);
				return;
			}
			if (data) {
				setProducts(data);
				setError(null);
			}
		};
		fetchProducts();
	}, []);
	console.log(products);

	const handleDelete = async (id: number) => {
		const { data, error } = await supabase
			.from("products")
			.delete()
			.eq("id", id)
			.select();

		if (error) {
			setError(`Could not delete product, Reason: ${error.message}`);
			return;
		}
		if (data) {
			setProducts(products.filter((product) => Number(product.id) !== id));
		}
	};
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
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Your Products</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Introducing Our Dynamic Orders Dashboard for Seamless
									Management and Insightful Analysis.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href="/products/newproduct">
									<Button>Create New Product</Button>
									<span className="sr-only">Create new product</span>
								</Link>
							</CardFooter>
						</Card>
					</div>
					<Tabs defaultValue="products">
						<div className="flex items-center">
							{/* <TabsList>
								<TabsTrigger value="products">Products</TabsTrigger>
								<TabsTrigger value="services">Services</TabsTrigger>
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
						{/* Table */}
						<TabsContent value="products">
							<Card x-chunk="dashboard-05-chunk-3">
								<CardHeader className="px-7">
									<CardTitle>Products</CardTitle>
									<CardDescription>These are your products.</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Name</TableHead>
												<TableHead className="hidden sm:table-cell">
													Description
												</TableHead>
												<TableHead className="hidden sm:table-cell">
													Price
												</TableHead>
												<TableHead className="hidden md:table-cell">
													Category
												</TableHead>
												<TableHead className="text-right">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{products.map((product) => (
												<TableRow key={product.id}>
													<TableCell>
														<div className="font-medium">{product.name}</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														{product.description}
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														${product.price?.toFixed(2)}
													</TableCell>
													<TableCell className="hidden md:table-cell">
														{product.category}
													</TableCell>
													<TableCell className="flex justify-end gap-1">
														<Link href={`/products/${product.id}`}>
															<Button size="sm">Edit</Button>
															<span className="sr-only">Edit</span>
														</Link>
														<Button
															onClick={() => handleDelete(product.id)}
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
						{/* <TabsContent value="services">
							<Card x-chunk="dashboard-05-chunk-3">
								<CardHeader className="px-7">
									<CardTitle>Services</CardTitle>
									<CardDescription>These are your services</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Services</TableHead>
												<TableHead className="hidden sm:table-cell">
													Type
												</TableHead>
												<TableHead className="hidden sm:table-cell">
													Status
												</TableHead>
												<TableHead className="hidden md:table-cell">
													Date
												</TableHead>
												<TableHead className="text-right">Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow className="bg-accent">
												<TableCell>
													<div className="font-medium">Liam Johnson</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														liam@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Sale
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="secondary">
														Fulfilled
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-23
												</TableCell>
												<TableCell className="text-right">$250.00</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">Olivia Smith</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														olivia@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Refund
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="outline">
														Declined
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-24
												</TableCell>
												<TableCell className="text-right">$150.00</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">Noah Williams</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														noah@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Subscription
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="secondary">
														Fulfilled
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-25
												</TableCell>
												<TableCell className="text-right">$350.00</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">Emma Brown</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														emma@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Sale
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="secondary">
														Fulfilled
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-26
												</TableCell>
												<TableCell className="text-right">$450.00</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">Liam Johnson</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														liam@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Sale
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="secondary">
														Fulfilled
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-23
												</TableCell>
												<TableCell className="text-right">$250.00</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">Liam Johnson</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														liam@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Sale
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="secondary">
														Fulfilled
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-23
												</TableCell>
												<TableCell className="text-right">$250.00</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">Olivia Smith</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														olivia@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Refund
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="outline">
														Declined
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-24
												</TableCell>
												<TableCell className="text-right">$150.00</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="font-medium">Emma Brown</div>
													<div className="hidden text-sm text-muted-foreground md:inline">
														emma@example.com
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													Sale
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge className="text-xs" variant="secondary">
														Fulfilled
													</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													2023-06-26
												</TableCell>
												<TableCell className="text-right">$450.00</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent> */}
					</Tabs>
				</div>
			</main>
		</>
	);
}
