"use client";
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

import { Table, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
	MessageDeleteSheet,
	MessageCreateSheet,
} from "@/features/messages/components";
import { useOptimistic } from "react";
type Message = Database["public"]["Tables"]["messages"]["Row"];

export default function Messages({
	params,
	messages,
}: {
	params: { orderId: string };
	messages: Message[];
}) {
	const [optimisticMessages, addOptimisticMessage] = useOptimistic<
		Message[],
		{ action: "add" | "delete"; newMessage: Message }
	>(messages, (state, { action, newMessage }) => {
		if (action === "add") {
			return [...state, newMessage];
		}
		if (action === "delete") {
			return state.filter((m) => m.id !== Number(newMessage.id));
		}
		return state;
	});

	return (
		<>
			<Card className="xl:col-span-2 xl:row-span-2">
				<CardHeader>
					<CardTitle>Kommunikation</CardTitle>
					<CardDescription>Dies ist der Kommunikationsverlauf</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-96 rounded-md border">
						<Table>
							<TableBody>
								{optimisticMessages?.map((message: Message) => (
									<TableRow key={message.id}>
										<TableCell>
											<div className="text-sm font-medium md:inline">
												{message.text}
											</div>
											<div className="text-muted-foreground">
												{message.author}
											</div>
										</TableCell>
										<TableCell className="flex items-center">
											{message.created_at
												? format(
														new Date(message.created_at),
														"dd.MM.yyyy, HH:mm",
													)
												: "N/A"}{" "}
										</TableCell>
										<TableCell>
											<MessageDeleteSheet
												orderId={Number(params.orderId)}
												messageId={message.id}
												removeOptimisticMessage={addOptimisticMessage}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
				<CardFooter>
					<MessageCreateSheet
						orderId={Number(params.orderId)}
						addOptimisticMessage={addOptimisticMessage}
					/>
				</CardFooter>
			</Card>
		</>
	);
}
