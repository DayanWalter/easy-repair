"use client";
import * as React from "react";

import { format } from "date-fns";
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
import { orders } from "@/database/orders";
import { v4 as uuidv4 } from "uuid";

export default function NewOrder() {
	const generateOrderId = () => uuidv4().split("-")[0];

	const [newOrder, setNewOrder] = React.useState({
		order_id: generateOrderId(),
		order_customer_id: 0,
		order_verified: false,
		order_state: undefined as string | undefined,
		order_again: false,
		order_old_order_id: undefined as string | undefined,
		order_account_access: undefined as string | undefined,
		order_account_access_more: undefined as string | undefined,
		order_article_device: undefined as string | undefined,
		order_article_manufaturer: undefined as string | undefined,
		order_article_accessory: undefined as string | undefined,
		order_date_start: undefined as Date | undefined,
		order_date_done: undefined as Date | undefined,
		order_date_taken: undefined as Date | undefined,
		order_error_description: undefined as string | undefined,
		order_diagnose: undefined as string | undefined,
		order_offer: undefined as string | undefined,
		order_repair: undefined as string | undefined,
		order_comment: undefined as string | undefined,
		order_employee: undefined as string | undefined,
		order_repair_time: 0,
		order_labor_costs: 0,
		order_material_costs: 0,
		order_costs: 0,
	});
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
			order_again: checked,
		}));
	};
	const handleCheckboxVerifiedChange = (checked: boolean) => {
		setNewOrder((prevState) => ({
			...prevState,
			order_verified: checked,
		}));
	};
	// Calendar
	const handleSetGetDate = (date: Date | undefined) => {
		setNewOrder((prevState) => ({
			...prevState,
			order_date_start: date,
		}));
	};
	const handleSetDoneDate = (date: Date | undefined) => {
		setNewOrder((prevState) => ({
			...prevState,
			order_date_done: date,
		}));
	};
	const handleSetPickupDate = (date: Date | undefined) => {
		setNewOrder((prevState) => ({
			...prevState,
			order_date_taken: date,
		}));
	};
	// Select
	const handleStateChange = (value: string) => {
		setNewOrder((prevState) => ({
			...prevState,
			order_state: value,
		}));
	};
	const handleEmployeeChange = (value: string) => {
		setNewOrder((prevState) => ({
			...prevState,
			order_employee: value,
		}));
	};

	const breadcrumbItems = [
		{ href: "/orders", label: "Orders" },
		{ href: "/orders/neworder", label: "New Order" },
	];
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
									Id: 123456
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Input
										type="name"
										id="name"
										placeholder="John Doe"
										disabled
									/>
									<Input type="phone" id="phone" placeholder="65865" disabled />
									<Input
										type="email"
										id="email"
										placeholder="John@Doe.com"
										disabled
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Kunden suchen</Button>
							</CardFooter>
						</Card>
						{/* Auftragsnummer */}
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Auftragsnummer</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-2">
									<Input id="order_id" value={newOrder.order_id} readOnly />
									<div className="flex items-center space-x-2">
										<Checkbox
											id="order_verified"
											checked={newOrder.order_verified}
											onCheckedChange={handleCheckboxVerifiedChange}
										/>
										<label
											htmlFor="order_verified"
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
										value={newOrder.order_state}
										onValueChange={handleStateChange}
									>
										<SelectTrigger className="">
											<SelectValue placeholder="Wählen Sie einen Status" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Status</SelectLabel>
												<SelectItem value="annahme">Annahme</SelectItem>
												<SelectItem value="technik">Technik</SelectItem>
												<SelectItem value="technikWartend">
													Technik wartend
												</SelectItem>
												<SelectItem value="kundenAnrufen">
													Kunden anrufen
												</SelectItem>
												<SelectItem value="geraetWirdAbgeholt">
													Gerät wird abgeholt
												</SelectItem>
												<SelectItem value="teileBestellt">
													Teile bestellt
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<div className="flex items-center space-x-2">
										<Checkbox
											id="order_again"
											checked={newOrder.order_again}
											onCheckedChange={handleCheckboxAgainChange}
										/>
										<label
											htmlFor="order_again"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Gerät erneut da
										</label>
									</div>
									<Input
										id="order_old_order_id"
										value={newOrder.order_old_order_id}
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
											id="order_account_access"
											value={newOrder.order_account_access}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Label htmlFor="accounts">Weitere</Label>
										<Input
											id="order_account_access_more"
											value={newOrder.order_account_access_more}
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
										<Label htmlFor="device">Gerät</Label>
										<Input
											id="order_article_device"
											value={newOrder.order_article_device}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Label htmlFor="manufacturer">Hersteller</Label>
										<Input
											id="order_article_manufaturer"
											value={newOrder.order_article_manufaturer}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Label htmlFor="accessory">Zubehör</Label>
										<Input
											id="order_article_accessory"
											value={newOrder.order_article_accessory}
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
										<Label htmlFor="device">Annahme</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"justify-start text-left font-normal",
														!newOrder.order_date_start &&
															"text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{newOrder.order_date_start ? (
														format(newOrder.order_date_start, "PPP")
													) : (
														<span>Angenommen am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={newOrder.order_date_start}
													onSelect={handleSetGetDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="manufacturer">Fertiggestellt</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"justify-start text-left font-normal",
														!newOrder.order_date_done &&
															"text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{newOrder.order_date_done ? (
														format(newOrder.order_date_done, "PPP")
													) : (
														<span>Fertiggestellt am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={newOrder.order_date_done}
													onSelect={handleSetDoneDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="accessory">Abgeholt</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"justify-start text-left font-normal",
														!newOrder.order_date_taken &&
															"text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{newOrder.order_date_taken ? (
														format(newOrder.order_date_taken, "PPP")
													) : (
														<span>Abgeholt am...</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar
													mode="single"
													selected={newOrder.order_date_taken}
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
									id="order_error_description"
									value={newOrder.order_error_description}
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
									id="order_diagnose"
									value={newOrder.order_diagnose}
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
									id="order_offer"
									value={newOrder.order_offer}
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
									id="order_repair"
									value={newOrder.order_repair}
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
									id="order_comment"
									value={newOrder.order_comment}
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
									value={newOrder.order_employee}
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
									id="order_repair_time"
									value={newOrder.order_repair_time}
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
									id="order_labor_costs"
									value={newOrder.order_labor_costs}
									onChange={handleChange}
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
									id="order_material_costs"
									value={newOrder.order_material_costs}
									onChange={handleChange}
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
									id="order_costs"
									value={newOrder.order_costs}
									onChange={handleChange}
									disabled
									placeholder="200.00€"
								/>
							</CardContent>
							<CardFooter />
						</Card>
					</div>
					<Button
						size={"lg"}
						variant={"destructive"}
						className="max-w-[250px] justify-self-end"
					>
						Auftrag erstellen
					</Button>
				</div>
			</main>
		</>
	);
}
