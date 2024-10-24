"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// Global Components
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import Avatar from "@/components/avatar/avatar";
import type { Order } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Features
import OrderFindCustomer from "@/features/orders/components/order-find-customer";

export default function NewOrder() {
	const router = useRouter();
	const supabase = createClientComponentClient();
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				setUserId(user.id);
			} else {
				router.push("/login"); // Redirect to login page if user is not authenticated
			}
		};

		fetchUser();
	}, [supabase, router]);

	const initialOrderState: Order = {
		customer_id: undefined,
		verified: false,
		state: undefined,
		again: false,
		old_order_id: undefined,
		account_access: undefined,
		account_access_more: undefined,
		article_device: undefined,
		article_manufacturer: undefined,
		article_accessory: undefined,
		date_start: undefined,
		date_done: undefined,
		date_taken: undefined,
		error_description: undefined,
		diagnose: undefined,
		offer: undefined,
		repair: undefined,
		comment: undefined,
		employee: undefined,
		repair_time: undefined,
		labor_costs: 0,
		material_costs: 0,
		total_costs: 0,
		user_id: null,
	};
	const breadcrumbItems = [
		{ href: "/orders", label: "Bestellungen" },
		{ href: "/orders/neworder", label: "Neue Bestellung" },
	];
	const [newOrder, setNewOrder] = useState<Order>(initialOrderState);
	//TODO: use error state
	const [error, setError] = useState<string | null>(null);

	// Textinput and Textarea
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;
		setNewOrder((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};
	// Checkbox
	const handleCheckboxAgainChange = (checked: boolean) => {
		setNewOrder((prevState) => ({
			...prevState,
			again: checked,
		}));
	};
	const handleCheckboxVerifiedChange = (checked: boolean) => {
		setNewOrder((prevState) => ({
			...prevState,
			verified: checked,
		}));
	};
	// Calendar
	const handleSetGetDate = (date: Date | undefined) => {
		setNewOrder((prevState) => ({
			...prevState,
			date_start: date,
		}));
	};
	const handleSetDoneDate = (date: Date | undefined) => {
		setNewOrder((prevState) => ({
			...prevState,
			date_done: date,
		}));
	};
	const handleSetPickupDate = (date: Date | undefined) => {
		setNewOrder((prevState) => ({
			...prevState,
			date_taken: date,
		}));
	};
	// Select
	const handleStateChange = (value: string) => {
		setNewOrder((prevState) => ({
			...prevState,
			state: value,
		}));
	};
	const handleEmployeeChange = (value: string) => {
		setNewOrder((prevState) => ({
			...prevState,
			employee: value,
		}));
	};

	const handleCustomerChange = (customerId: number) => {
		setNewOrder((prevState) => ({
			...prevState,
			customer_id: customerId,
		}));
	};
	const handleCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		const numericValue = value ? Number(value) : 0;

		setNewOrder((prevState) => {
			const updatedState = {
				...prevState,
				[id]: numericValue,
			};

			const otherCostField =
				id === "labor_costs" ? "material_costs" : "labor_costs";
			updatedState.total_costs =
				numericValue + (prevState[otherCostField] || 0);

			return updatedState;
		});
	};

	const handleCreateOrder = async () => {
		console.log("Order created:", newOrder);
		//TODO: Error handling
		const { error, data } = await supabase
			.from("orders")
			.insert([
				{
					...newOrder,
					user_id: userId,
				},
			])
			.select();

		if (error) {
			console.error("Error creating order:", error);
			setError(`Could not create order, Reason: ${error.message}`);
		}
		if (data) {
			console.log("Order created:", data);
			setError(null);
			setNewOrder(initialOrderState);
			router.push("/orders");
			//TODO: Show toast
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
						<OrderFindCustomer onCustomerChange={handleCustomerChange} />
						{/* Auftragsnummer */}
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Auftragsnummer</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Input id="id" value={"PLACEHOLDER"} readOnly />
									<div className="flex items-center space-x-2">
										<Checkbox
											id="verified"
											checked={newOrder.verified}
											onCheckedChange={handleCheckboxVerifiedChange}
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
									<Select
										value={newOrder.state}
										onValueChange={handleStateChange}
									>
										<SelectTrigger className="">
											<SelectValue placeholder="Wählen Sie einen Status" />
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
											checked={newOrder.again}
											onCheckedChange={handleCheckboxAgainChange}
										/>
										<label
											htmlFor="again"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Gerät erneut da
										</label>
									</div>
									<Label htmlFor="old_order_id">Alte Auftragsnummer</Label>
									<Input
										id="old_order_id"
										value={newOrder.old_order_id}
										onChange={handleChange}
									/>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Kommunikation */}
						<Card x-chunk="dashboard-05-chunk-1" className="xl:col-span-2">
							<CardHeader className="pb-2">
								<CardTitle>Kommunikation</CardTitle>
								<CardDescription>
									Dies ist der Kommunikationsverlauf
								</CardDescription>
							</CardHeader>
							<CardContent />
							<CardFooter />
						</Card>
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
											id="account_access"
											value={newOrder.account_access}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Label htmlFor="accounts">Weitere</Label>
										<Input
											id="account_access_more"
											value={newOrder.account_access_more}
											onChange={handleChange}
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Artikel */}
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
											value={newOrder.article_device}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Label htmlFor="article_manufacturer">Hersteller</Label>
										<Input
											id="article_manufacturer"
											value={newOrder.article_manufacturer}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Label htmlFor="article_accessory">Zubehör</Label>
										<Input
											id="article_accessory"
											value={newOrder.article_accessory}
											onChange={handleChange}
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Datum */}
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
														!newOrder.date_start && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{newOrder.date_start ? (
														format(newOrder.date_start, "PPP")
													) : (
														<span>Angenommen am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={newOrder.date_start}
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
														!newOrder.date_done && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{newOrder.date_done ? (
														format(newOrder.date_done, "PPP")
													) : (
														<span>Fertiggestellt am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={newOrder.date_done}
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
														!newOrder.date_taken && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{newOrder.date_taken ? (
														format(newOrder.date_taken, "PPP")
													) : (
														<span>Abgeholt am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={newOrder.date_taken}
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
						{/* Fehlerbeschreibung */}
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
									value={newOrder.error_description}
									onChange={handleChange}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Diagnose */}
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
									value={newOrder.diagnose}
									onChange={handleChange}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Angebot */}
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
									value={newOrder.offer}
									onChange={handleChange}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Reparatur */}
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
									value={newOrder.repair}
									onChange={handleChange}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Anmerkungen */}
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
									value={newOrder.comment}
									onChange={handleChange}
								/>
							</CardContent>
							<CardFooter />
						</Card>
						{/* Mitarbeiter */}
						<Card x-chunk="dashboard-05-chunk-1">
							<CardHeader className="pb-2">
								<CardTitle>Mitarbeiter</CardTitle>
								<CardDescription>
									Welcher Mitarbeiter hat den Auftrag erledigt?
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Select
									value={newOrder.employee}
									onValueChange={handleEmployeeChange}
								>
									<SelectTrigger className="">
										<SelectValue placeholder="Wählen Sie einen Mitarbeiter" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Status</SelectLabel>
											<SelectItem value="mitarbeiter1">Mitarbeiter1</SelectItem>
											<SelectItem value="mitarbeiter2">Mitarbeiter2</SelectItem>
											<SelectItem value="mitarbeiter3">Mitarbeiter3</SelectItem>
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
									value={newOrder.repair_time}
									onChange={handleChange}
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
									id="labor_costs"
									value={newOrder.labor_costs?.toString() || ""}
									onChange={handleCostsChange}
									type="number"
									step="0.01"
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
									id="material_costs"
									value={newOrder.material_costs?.toString() || ""}
									onChange={handleCostsChange}
									type="number"
									step="0.01"
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
									id="total_costs"
									value={`${newOrder.total_costs?.toFixed(2) || "0.00"} €`}
									readOnly
									disabled
								/>
							</CardContent>
							<CardFooter />
						</Card>
					</div>
					{/* Auftrag erstellen Button */}
					<Button
						size={"lg"}
						variant={"destructive"}
						className="max-w-[250px] justify-self-end"
						onClick={handleCreateOrder}
					>
						Auftrag erstellen
					</Button>
				</div>
			</main>
		</>
	);
}
