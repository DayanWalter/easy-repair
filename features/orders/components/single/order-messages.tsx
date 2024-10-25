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
import OrderMessagesSheet from "./order-messages-sheet";
import { readOrderMessages } from "@/features/orders/api/read";
import { Separator } from "@/components/ui/separator";

export default function OrderMessages({
	messages,
}: {
	messages: OrderCommunication[];
}) {
	console.log(messages);

	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Kommunikation</CardTitle>
				<CardDescription>Dies ist der Kommunikationsverlauf</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="py-2">
				<OrderMessagesSheet />
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
						{messages?.map((message: OrderCommunication) => (
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
