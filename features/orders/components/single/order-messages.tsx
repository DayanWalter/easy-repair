"use client";
import supabase from "@/database/supabaseClient";
import { useEffect, useState } from "react";
import { TableCell } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import type { OrderCommunication } from "@/types";

export default function OrderMessages({ orderId }: { orderId: number }) {
	const [newMessage, setNewMessage] = useState({ author: "", text: "" });
	//TODO: use error state
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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
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
			<CardHeader className="pb-2">
				<CardTitle>Kommunikation</CardTitle>
				<CardDescription>Dies ist der Kommunikationsverlauf</CardDescription>
			</CardHeader>
			<CardContent>
				<Sheet>
					<SheetTrigger asChild>
						<Button>Neue Nachricht</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Neue Nachricht</SheetTitle>
							<SheetDescription>
								Fügen Sie eine neue Nachricht oder Aktualisierung zu diesem
								Auftrag hinzu. Dies wird im Kommunikationsverlauf sichtbar sein.
							</SheetDescription>
						</SheetHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="author" className="text-right">
									Name
								</Label>
								<Input
									id="author"
									placeholder="Ihr Name"
									value={newMessage.author}
									onChange={handleChange}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="text" className="text-right">
									Nachricht
								</Label>
								<Textarea
									id="text"
									placeholder="Ihre Nachricht"
									value={newMessage.text}
									onChange={handleChange}
									className="col-span-3"
								/>
							</div>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button onClick={handleAddMessage}>Neue Nachricht</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
				{/* Communication-table */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Inhalt</TableHead>
							<TableHead className="flex items-center justify-end">
								Datum
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
									<div className="text-muted-foreground">{message.author}</div>
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
		</>
	);
}
