"use client";

import Image from "next/image";
import { format, setDate } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Avatar from "@/components/avatar/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { orders } from "@/database/orders";
import { customers } from "@/database/customers";
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";

import supabase from "@/database/supabaseClient";
import type { Order } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// TEMP
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import OrderMessages from "@/components/order-messages/order-messages";

type Props = {
	params: {
		orderId: string;
	};
};

export default function SingleOrder({ params }: Props) {
	const router = useRouter();
	const [order, setOrder] = useState<Order>({} as Order);
	const [error, setError] = useState<string | null>(null);

	const breadcrumbItems = [
		{
			label: "Orders",
			href: "/orders",
		},
		{
			label: String(order?.id),
			href: `/orders/${order?.id}`,
		},
	];
	useEffect(() => {
		const fetchOrder = async () => {
			const { data, error } = await supabase
				.from("orders")
				.select()
				.eq("id", params.orderId)
				.single();

			if (error) {
				console.error("Error fetching order:", error);
				setError(error.message);
			}
			if (data) {
				setOrder(data);
				setError(null);
			}
		};
		fetchOrder();
	}, [params.orderId]);

	const handleVerifiedChange = () => {
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					verified: !prevOrder.verified,
				};
			}
			return prevOrder;
		});
	};
	const handleStateChange = (e: string) => {
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					state: e,
				};
			}
			return prevOrder;
		});
	};
	const handleAgainChange = () => {
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					again: !prevOrder.again,
				};
			}
			return prevOrder;
		});
	};
	const handleOldOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					old_order_id: e.target.value,
				};
			}
			return prevOrder;
		});
	};
	const handleAccountAccess = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					account_access: e.target.value,
				};
			}
			return prevOrder;
		});
	};
	const handleAccountAccessMore = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					account_access_more: e.target.value,
				};
			}
			return prevOrder;
		});
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					[id]: value,
				};
			}
			return prevOrder;
		});
	};
	const handleSetGetDate = (date: Date | undefined) => {
		setOrder((prevOrder) => ({
			...prevOrder,
			date_start: date,
		}));
	};
	const handleSetDoneDate = (date: Date | undefined) => {
		setOrder((prevOrder) => ({
			...prevOrder,
			date_done: date,
		}));
	};
	const handleSetPickupDate = (date: Date | undefined) => {
		setOrder((prevOrder) => ({
			...prevOrder,
			date_taken: date,
		}));
	};
	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					[id]: value,
				};
			}
			return prevOrder;
		});
	};
	const handleEmployeeChange = (e: string) => {
		setOrder((prevOrder) => {
			if (prevOrder) {
				return {
					...prevOrder,
					employee: e,
				};
			}
			return prevOrder;
		});
	};
	const handleCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setOrder((prevOrder) => {
			if (prevOrder) {
				const updatedOrder = { ...prevOrder, [id]: value };
				const labor =
					Number(id === "labor_costs" ? value : prevOrder.labor_costs) || 0;
				const material =
					Number(id === "material_costs" ? value : prevOrder.material_costs) ||
					0;
				updatedOrder.total_costs = Number((labor + material).toFixed(2));
				return updatedOrder;
			}
			return prevOrder;
		});
	};
	const handleSubmit = async () => {
		const { data, error } = await supabase
			.from("orders")
			.update(order)
			.eq("id", order?.id)
			.select();
		if (error) {
			console.error("Error updating order:", error);
			setError(error.message);
		}
		if (data) {
			console.log("Order updated:", data);
			setError(null);
			router.push("/orders");
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
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
						{/* Kunde */}
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Kunde</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Id: {order?.customer_id}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Input
										type="name"
										id="name"
										placeholder="Name of customer"
										disabled
									/>
									<Input
										type="phone"
										id="phone"
										placeholder="Phone of customer"
										disabled
									/>
									<Input
										type="email"
										id="email"
										placeholder="Email of customer"
										disabled
									/>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Auftragsnummer */}
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Auftragsnummer</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Input placeholder={order?.id} disabled />
									<div className="flex items-center space-x-2">
										<Checkbox
											id="verified"
											checked={order?.verified}
											onClick={handleVerifiedChange}
										/>
										<label
											htmlFor="verified"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Auftrag erteilt
										</label>
									</div>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Status */}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Status</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Select onValueChange={handleStateChange}>
										<SelectTrigger>
											<SelectValue placeholder={order?.state} />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Status</SelectLabel>
												<SelectItem value="Annahme">Annahme</SelectItem>
												<SelectItem value="Technik">Technik</SelectItem>
												<SelectItem value="Technik wartend">
													Technik wartend
												</SelectItem>
												<SelectItem value="Kunden anrufen">
													Kunden anrufen
												</SelectItem>
												<SelectItem value="Gerät wird abgeholt">
													Gerät wird abgeholt
												</SelectItem>
												<SelectItem value="Teile bestellt">
													Teile bestellt
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<div className="flex items-center space-x-2">
										<Checkbox
											id="again"
											checked={order?.again}
											onClick={handleAgainChange}
										/>
										<label
											htmlFor="again"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Gerät erneut da
										</label>
									</div>
									<Input
										placeholder="Alte Auftragsnummer"
										value={order?.old_order_id}
										onChange={handleOldOrderId}
									/>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Kommunikation */}
						<OrderMessages orderId={Number(order?.id)} />
						{/* Zugänge */}
						<Card className="xl:col-span-1" x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Zugänge</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<div>
										<Label htmlFor="password">Passwort</Label>
										<Input
											id="password"
											placeholder="Passwords"
											value={order?.account_access}
											onChange={handleAccountAccess}
										/>
									</div>
									<div>
										<Label htmlFor="accounts">Weitere</Label>
										<Input
											id="accounts"
											placeholder="More"
											value={order?.account_access_more}
											onChange={handleAccountAccessMore}
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Artikel - done*/}
						<Card className="xl:col-span-3" x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Artikel</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-3">
									<div>
										<Label htmlFor="article_device">Gerät</Label>
										<Input
											id="article_device"
											onChange={handleInputChange}
											value={order?.article_device}
										/>
									</div>
									<div>
										<Label htmlFor="article_manufacturer">Hersteller</Label>
										<Input
											id="article_manufacturer"
											onChange={handleInputChange}
											value={order?.article_manufacturer}
										/>
									</div>
									<div>
										<Label htmlFor="article_accessory">Zubehör</Label>
										<Input
											id="article_accessory"
											onChange={handleInputChange}
											value={order?.article_accessory}
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Datum  - done*/}
						<Card className="" x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Datum</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<div className="grid gap-2">
										<Label htmlFor="date_start">Annahme</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"justify-start text-left font-normal",
														!order?.date_start && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{order?.date_start ? (
														format(order?.date_start, "PPP")
													) : (
														<span>Angenommen am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={order?.date_start}
													onSelect={handleSetGetDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="date_done">Fertiggestellt</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"justify-start text-left font-normal",
														!order?.date_done && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{order?.date_done ? (
														format(order?.date_done, "PPP")
													) : (
														<span>Fertiggestellt am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={order?.date_done}
													onSelect={handleSetDoneDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="date_taken">Abgeholt</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"justify-start text-left font-normal",
														!order?.date_taken && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{order?.date_taken ? (
														format(order?.date_taken, "PPP")
													) : (
														<span>Abgeholt am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={order?.date_taken}
													onSelect={handleSetPickupDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Fehlerbeschreibung - done*/}
						<Card className="" x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Fehlerbeschreibung</CardTitle>
								<CardDescription>
									Beschreiben Sie das aufgetretene Problem.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									id="error_description"
									onChange={handleTextareaChange}
									value={order?.error_description}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Diagnose - done*/}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Diagnose</CardTitle>
								<CardDescription>
									Geben Sie die Ursache des Problems an.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									id="diagnose"
									onChange={handleTextareaChange}
									value={order?.diagnose}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Angebot - done*/}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Angebot</CardTitle>
								<CardDescription>
									Beschreiben Sie die vorgeschlagenen Maßnahmen und die Kosten.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									id="offer"
									onChange={handleTextareaChange}
									value={order?.offer}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Reparatur -done */}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Reparatur</CardTitle>
								<CardDescription>
									Erklären Sie, was zur Behebung des Problems unternommen wurde.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									id="repair"
									onChange={handleTextareaChange}
									value={order?.repair}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Anmerkungen - done*/}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Anmerkungen</CardTitle>
								<CardDescription>
									Teilen Sie zusätzliche relevante Informationen mit.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									id="comment"
									onChange={handleTextareaChange}
									value={order?.comment}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Mitarbeiter - done*/}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Mitarbeiter</CardTitle>
								<CardDescription>
									Welcher Mitarbeiter hat den Auftrag erledigt?
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Select onValueChange={handleEmployeeChange}>
									<SelectTrigger>
										<SelectValue placeholder={order?.employee} />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Status</SelectLabel>
											<SelectItem value="Mitarbeiter1">Mitarbeiter1</SelectItem>
											<SelectItem value="Mitarbeiter2">Mitarbeiter2</SelectItem>
											<SelectItem value="Mitarbeiter3">Mitarbeiter3</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Zeit */}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Zeit</CardTitle>
								<CardDescription>
									Wie lange hat die Reparatur gedauert?
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Input
									id="repair_time"
									onChange={handleInputChange}
									value={order?.repair_time}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Lohnkosten */}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Lohnkosten</CardTitle>
								<CardDescription>Wie hoch sind die Lohnkosten?</CardDescription>
							</CardHeader>
							<CardContent>
								<Input
									placeholder="80.00€"
									id="labor_costs"
									onChange={handleCostsChange}
									value={order?.labor_costs}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Materialkosten */}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Materialkosten</CardTitle>
								<CardDescription>
									Wie hoch sind die Materialkosten?
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Input
									placeholder="120.00€"
									id="material_costs"
									onChange={handleCostsChange}
									value={order?.material_costs}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Gesamtkosten */}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Gesamtkosten</CardTitle>
								<CardDescription>
									Wie hoch sind die Gesamtkosten?
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Input
									disabled
									placeholder="200.00€"
									id="total_costs"
									value={order?.total_costs}
								/>
							</CardContent>
							<CardFooter />
						</Card>
					</div>
					<Button
						size={"lg"}
						variant={"destructive"}
						className="max-w-[250px] justify-self-end"
						onClick={handleSubmit}
					>
						Change order
					</Button>
				</div>
			</main>
		</>
	);
}
