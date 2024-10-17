import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { TableCell } from "../ui/table";
import { TableBody } from "../ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Table, TableHead, TableHeader, TableRow } from "../ui/table";
import { format } from "date-fns";
import type { OrderCommunication } from "@/types";

export default function OrderMessages({ orderId }: { orderId: number }) {
	const [newMessage, setNewMessage] = useState({ author: "", text: "" });
	const [error, setError] = useState<string | null>(null);

	const [communication, setCommunication] = useState<OrderCommunication[]>([]);

	useEffect(() => {
		const fetchCommunication = async () => {
			const { data, error } = await supabase
				.from("order_communication")
				.select()
				.eq("order_id", orderId);

			if (error) {
				console.error("Error fetching communication:", error);
				setError(error.message);
			}
			if (data) {
				setCommunication(data);
				setError(null);
			}
		};
		if (!Number.isNaN(orderId)) {
			fetchCommunication();
		}
	}, [orderId]);

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setNewMessage((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setNewMessage((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleAddMessage = async () => {
		const { data, error } = await supabase
			.from("order_communication")
			.insert({
				order_id: orderId,
				author: newMessage.author,
				text: newMessage.text,
			})
			.select();

		if (error) {
			console.error("Error adding message:", error);
			setError(error.message);
		}

		if (data) {
			// Update the local state with the new message
			setCommunication([...communication, data[0]]);
			setNewMessage({ author: "", text: "" });
			setError(null);
		}
	};
	return (
		<>
			<Card
				x-chunk="dashboard-05-chunk-1"
				className="h-72 overflow-auto xl:col-span-2 "
			>
				<CardHeader className="pb-2">
					<CardTitle>Kommunikation</CardTitle>
					<CardDescription>Dies ist der Kommunikationsverlauf</CardDescription>
				</CardHeader>
				<CardContent>
					<Sheet>
						<SheetTrigger asChild>
							<Button>New message</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Add New Message</SheetTitle>
								<SheetDescription>
									Add a new message or update about this order. This will be
									visible in the communication history.
								</SheetDescription>
							</SheetHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="author" className="text-right">
										Name
									</Label>
									<Input
										id="author"
										placeholder="Your name"
										value={newMessage.author}
										onChange={handleChangeName}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="text" className="text-right">
										Message
									</Label>
									<Textarea
										id="text"
										placeholder="Your message"
										value={newMessage.text}
										onChange={handleChangeText}
										className="col-span-3"
									/>
								</div>
							</div>
							<SheetFooter>
								<SheetClose asChild>
									<Button onClick={handleAddMessage}>Add new message</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
					{/* Communication-table */}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Content</TableHead>
								<TableHead className="flex items-center justify-end">
									Date
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{/* Communication */}
							{communication?.map((message: OrderCommunication) => (
								<TableRow key={message.id}>
									<TableCell>
										<div className="text-sm font-medium md:inline">
											{message.text}
										</div>
										<div className="text-muted-foreground">
											{message.author}
										</div>
									</TableCell>
									<TableCell className="flex items-center justify-end">
										{message.created_at
											? format(new Date(message.created_at), "dd.MM.yyyy HH:mm")
											: "N/A"}{" "}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter />
			</Card>
		</>
	);
}
